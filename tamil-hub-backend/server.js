require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { MongoClient, ObjectId, Binary } = require("mongodb");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));

const client = new MongoClient(process.env.MONGODB_URI);
const SECRET = process.env.JWT_SECRET;
let items, settings, files;

function auth(role) {
  return (req, res, next) => {
    try {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      const p = jwt.verify(token, SECRET);
      if (role && p.role !== role) return res.status(403).json({ error: "Not allowed" });
      req.user = p;
      next();
    } catch (e) {
      res.status(401).json({ error: "Login required" });
    }
  };
}

const clean = (v, max) => String(v == null ? "" : v).trim().slice(0, max);

app.post("/api/login", async (req, res) => {
  const u = clean(req.body.username, 60).toLowerCase();
  const p = String(req.body.password || "");
  let role = null;
  if (u === "elizabeth rathi" && p === process.env.ADMIN_PASSWORD) role = "admin";
  else if (u === "student") {
    const s = await settings.findOne({ _id: "student" });
    if (s && (await bcrypt.compare(p, s.hash))) role = "student";
  }
  if (!role) return res.status(401).json({ error: "Wrong username or password" });
  res.json({ role, token: jwt.sign({ role }, SECRET, { expiresIn: "7d" }) });
});

app.get("/api/items", auth(), async (req, res) => {
  const list = await items.find().sort({ _id: -1 }).toArray();
  res.json(list.map((i) => ({ ...i, id: i._id.toString(), _id: undefined })));
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

app.post("/api/upload", auth("admin"), (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.code === "LIMIT_FILE_SIZE" ? "File is too big (max 8 MB)" : "Upload failed" });
    }
    const f = req.file;
    if (!f) return res.status(400).json({ error: "No file chosen" });
    if (f.buffer.slice(0, 4).toString() !== "%PDF") return res.status(400).json({ error: "Only PDF files are allowed" });
    const name = clean(f.originalname, 150);
    const r = await files.insertOne({ name, size: f.size, data: new Binary(f.buffer) });
    res.json({ fileId: r.insertedId.toString(), fileName: name });
  });
});

app.get("/api/files/:id", auth(), async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Bad id" });
  const f = await files.findOne({ _id: new ObjectId(req.params.id) });
  if (!f) return res.status(404).json({ error: "File not found" });
  res.set({ "Content-Type": "application/pdf", "Content-Disposition": "inline" });
  res.send(Buffer.from(f.data.buffer));
});

app.post("/api/items", auth("admin"), async (req, res) => {
  const type = clean(req.body.type, 10);
  if (!["lesson", "paper", "video", "homework"].includes(type)) return res.status(400).json({ error: "Bad type" });
  const cls = clean(req.body.cls, 2);
  if (!["11", "12"].includes(cls)) return res.status(400).json({ error: "Bad class" });
  const title = clean(req.body.title, 200);
  if (!title) return res.status(400).json({ error: "Title required" });
  const doc = {
    type,
    cls,
    title,
    cat: clean(req.body.cat, 60) || "General",
    year: clean(req.body.year, 10),
    body: clean(req.body.body, 20000),
  };
  if (req.body.fileId && ObjectId.isValid(req.body.fileId)) {
    doc.fileId = String(req.body.fileId);
    doc.fileName = clean(req.body.fileName, 150);
  }
  const r = await items.insertOne(doc);
  res.json({ ...doc, id: r.insertedId.toString(), _id: undefined });
});

app.delete("/api/items/:id", auth("admin"), async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Bad id" });
  const old = await items.findOne({ _id: new ObjectId(req.params.id) });
  if (old && old.fileId && ObjectId.isValid(old.fileId)) await files.deleteOne({ _id: new ObjectId(old.fileId) });
  await items.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ ok: true });
});

app.put("/api/student-password", auth("admin"), async (req, res) => {
  const pw = String(req.body.password || "");
  if (pw.length < 4) return res.status(400).json({ error: "Use at least 4 characters" });
  await settings.updateOne({ _id: "student" }, { $set: { hash: await bcrypt.hash(pw, 10) } }, { upsert: true });
  res.json({ ok: true });
});

app.get("/", (req, res) => res.send("Tamil Study Hub API is running"));

(async () => {
  await client.connect();
  const db = client.db("tamilstudyhub");
  items = db.collection("items");
  settings = db.collection("settings");
  files = db.collection("files");
  if (!(await settings.findOne({ _id: "student" }))) {
    const hash = await bcrypt.hash(process.env.STUDENT_PASSWORD || "student123", 10);
    await settings.insertOne({ _id: "student", hash });
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Server running on port " + port));
})().catch((e) => {
  console.error("Startup failed:", e.message);
  process.exit(1);
});


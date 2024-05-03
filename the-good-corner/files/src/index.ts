import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const port = 4567;
const app = express();

const storage = multer.diskStorage({
  destination: function (_, __, cback) {
    cback(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (_, file, cback) {
    cback(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(404).json({ error: "File not found" });

  return fs.readFile(req.file.filename, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({
        status: "success",
        filename: "/img/" + req.file?.filename,
      });
    }
  });
});

app.get("/files/:filename", (req, res) => {
  let file = path.join("/..uploads/", req.params.filename);
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text" });
      res.write("File not found");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/octet-stream" });
      res.write(content);
      res.end();
    }
  });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});

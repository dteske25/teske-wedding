const express = require("express");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage });

const app = express();

const port = 3000;

const storage = new Storage();

app.post("/upload", upload.array("files"), async (req, res) => {
  console.log(`Received request to upload [${req.files.length}] file(s)`);
  const bucket = storage.bucket("teske-wedding-uploads");
  const fileUploads = req.files.map((f) => {
    const id = uuidv4();
    console.log(`Starting upload for ${id}`);
    return bucket
      .file(id)
      .save(f.buffer, { contentType: f.mimetype })
      .catch(console.error)
      .finally(() => console.log(`Finished uploading ${id}`));
  });
  await Promise.all(fileUploads);
  res.status(200).send("Finished all uploading!");
});

app.listen(port, () => {
  console.log(`Wedding app backend listening on port ${port}`);
});

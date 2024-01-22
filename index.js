const express = require("express");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hola</h1>");
});

app.get("/descargar-archivo", (req, res) => {
  const archivoPath = path.join(__dirname, "archivos", "app-debug.apk");

  if (!fs.existsSync(archivoPath)) {
    return res.status(404).send("Archivo no encontrado");
  }

  const mimeType = mime.lookup(archivoPath);

  res.setHeader("Content-disposition", "attachment; filename=app-debug.apk");
  res.setHeader("Content-type", mimeType);

  const archivoStream = fs.createReadStream(archivoPath);
  archivoStream.pipe(res);
});

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});

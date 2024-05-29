const express = require('express')
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', upload.single('logbook'), async (req, res) => {
  let logbook = await fs.promises.readFile(req.file.path, "utf8");

  let output = "";
  // Add car information
  output += "Make: " + req.body.make + "<br/>"
  output += "Model: " + req.body.model + "<br/>"
  output += "Badge: " + req.body.badge + "<br/>"

  // Add logbook
  output += "<br/>Logbook:<br/><br/>" + logbook

  res.send(output)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

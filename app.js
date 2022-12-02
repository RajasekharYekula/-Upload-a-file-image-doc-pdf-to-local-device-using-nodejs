const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fileupload = require("express-fileupload");
const app = express()
const multer = require("multer");
const PORT = process.env.PORT || 3500;
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './photos');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage: storage }).single('files');


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
 
})


app.post('/upload',
  fileupload({ createParentPath: true }),
  (req, res) => {
    const files = req.files
    console.log(files)

    let buffer = files.files.data;
    let fileName = files.files.name;
    let filepath = "D:/Practice/Uploadfiles/photos/" + fileName;
    //fs.appendFileSync( "filaName", )

    fs.appendFileSync(filepath,buffer, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        // Get the file contents after the append operation
        console.log("\nFile Contents of file after append:");
          //fs.readFileSync("example_file.txt", "utf8"));
      }
    });
    upload(req, res, function (err) {
      if (!err) {
        //console.log(err);
        return res.end("Error uploading file." + err);
      }
      res.end("File is uploaded");
    });

  })

app.listen(PORT, () => console.log('server is running on Port:3500'));
module.exports = app;
Footer

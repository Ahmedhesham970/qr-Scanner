const express = require("express");
const jimp = require("jimp");
const fs = require("fs");
const qrCodeReader = require("qrcode-reader");
const app = express();
const pic = fs.readFileSync("./pics/Untitled.png");

app.get("/", function (req, res) {
  jimp.read(pic, function (err, image) {
    if (err) {
      console.error(err);
    }

    const qrCodeInstance = new qrCodeReader();

    qrCodeInstance.callback = function (err, value) {
      if (err) {
        console.error(err);
      }
      let myValue = value.result;
      console.log(myValue);
      res.send(`<h1>${myValue}</h1>`);
    };
    qrCodeInstance.decode(image.bitmap);
  });
});



app.listen(1000, function () {
          console.log("app listening on port 1000 ")
})

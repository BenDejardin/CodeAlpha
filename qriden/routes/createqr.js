var qrcode = require("qrcode");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("createqr", { title: "QRCODE IDENT", saisie: true });
});

router.post("/scan", (req, res, next) => {
  let input_identite = req.body.identite;
  let input_code = req.body.code;
  let contenuQR = input_identite + "\n" + input_code;
  qrcode.toDataURL(contenuQR, (err, src) => {
    if (err) res.send("Un problème est survenu !!!");
    res.render("createqr", {
      title: "Générateur QR Code",
      saisie: false,
      qr_code: src,
    });
  });
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const isUrl = require("is-url");
const app = express();
let urls = [];
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/shorturl/:url", (req, res) => {
  res.redirect(
    urls.filter((u) => u.short_url == req.params.url)[0].original_url,
  );
});

app.post("/api/shorturl", (req, res) => {
  if (!isUrl(req.body.url)) {
    res.json({ error: "invalid url" });
    return;
  }
  let randomURL = randomString(6);
  let urlObject = { original_url: req.body.url, short_url: randomURL };
  urls.push({ original_url: req.body.url, short_url: randomURL });
  res.json(urlObject);
});

function randomString(length) {
  return (Math.random() + 1).toString(36).substring(length);
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

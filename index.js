const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var favicon = require("serve-favicon");
const { v2, auth } = require("osu-api-extended");

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "site", "dist")))
  .use(cors())
  .use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(favicon(path.join(__dirname, "site", "public", "vite.svg")));

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// app.listen( PORT, () => {
//   console.log(`server up on http://localhost:${PORT}`);
// })

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./site/dist/index.html"));
});

const main = async () => {
  await auth.login(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
  const data = await v2.beatmap.search({
    sort: "plays_desc",
    mode: "osu",
    // cursor_string: 'eyJwbGF5X2NvdW50IjoiMjY5MDg3MDQiLCJpZCI6Ijk2MjA4OCJ9',
    nsfw: true
  });
  console.log(data.beatmapsets.length)
  console.log(JSON.stringify(data, null, "  "));

};
main();

app.get("/getTop", (req, res) => {});

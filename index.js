const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");


require("dotenv").config();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "site", "build")))
  .use(cors())
  .use(cookieParser())
  .use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })



const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
  console.log(`server up on http://localhost:${PORT}`);
})

app.get("/index", function (req, res) {
  // console.log("yeah")
  res.sendFile(path.join(__dirname, "./site/dist/index.html"));
});

app.get("/getTop/:id", async (req, res) => { 
  console.log("yeah")
})

app.get("/auth", (req, res) => {
  res.redirect("https://osu.ppy.sh/oauth/authorize?" + new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: "http://localhost:5000/callback",
    response_type: "code",
  }))
})
app.get("/callback", async (req, res) => {
  const receivedCode = req.query.code;

  const data = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${receivedCode}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fcallback` 

  let response = await fetch("https://osu.ppy.sh/oauth/token", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data
  })

  response = await response.json();

  const accessToken = response.access_token;
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
  res.cookie('loggedIn', true, { httpOnly: true, secure: true });

  loggedIn = true;
  res.redirect(`/?` + new URLSearchParams({
    loggedIn: true,

  }))
})

app.get("/loggedIn", (req, res) => {
  const loggedIn = req.cookies.loggedIn;
  res.status(200).send(loggedIn);
})

app.get("/me", async (req, res) => {
  const loggedIn = req.cookies.loggedIn;
  if (!loggedIn) {
    // If the access token is not present or expired, send an unauthorized response
    res.status(401).send('Unauthorized');
    return;
  }
  const accessToken = req.cookies.accessToken;
  let response = await fetch("https://osu.ppy.sh/api/v2/me", { 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + accessToken
    }
  })
  response = await response.json();
  res.status(200).send(response);
});

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
  // main();
  console.log(`server up on http://localhost:${PORT}`);
})

// app.get("/", function (req, res) {
//   // console.log("yeah")
//   res.sendFile(path.join(__dirname, "./site/dist/index.html"));
// });

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
let userInfo = {};
let loggedIn = false;
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

  console.log(response)
  // redirect to index and then store stuff
  // res.status(200).send()
  userInfo = response;
  const accessToken = response.access_token;
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
  res.cookie('loggedIn', true, { httpOnly: true, secure: true });

  loggedIn = true;
  res.redirect(`/?` + new URLSearchParams({
    loggedIn: true,

  }))

  // res.status(200).send(response);
})

app.get("/userInfo", (req, res) => {
  res.status(200).send(userInfo);
})

app.get("/loggedIn", (req, res) => {
  // res.status(200).send(loggedIn);
  const loggedIn = req.cookies.loggedIn;

  // if (!loggedIn) {
  //   // If the access token is not present or expired, send an unauthorized response
  //   res.status(401).send('Unauthorized');
  //   return;
  // }
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

async function main() {
  // get auth
  let test = await fetch("https://osu.ppy.sh/oauth/authorize" + new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: "http://localhost:5000/callback",
    response_type: "code",
  }))
  // test = await test.json();
  // console.log(test)
}

// const main = async (id) => {
//   await auth.login(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
//   // const data = await v2.beatmap.search({
//   //   sort: "plays_desc",
//   //   mode: "osu",
//   //   // cursor_string: 'eyJwbGF5X2NvdW50IjoiMjY5MDg3MDQiLCJpZCI6Ijk2MjA4OCJ9',
//   //   nsfw: true
//   // });
//   // console.log(data.beatmapsets.length)
//   // console.log(JSON.stringify(data, null, "  "));
//                                             //  user id, limit, page offset   
//   let test = await v2.user.beatmaps.most_played(id, 100, 0)

//   // console.log(test)
//   return test;

// };
// // main();

// app.get("/getTop/:id", async (req, res) => {
//   const id = req.params.id;
//   // let test = await main(id);
//   let test = await v2.user.beatmaps.most_played(id);
//   let test2 = await v2.user.beatmaps.most_played(id);
//   let test3 = await v2.user.beatmaps.most_played(id);
  
//   // console.log(test)
//   // res.status(200).json(test);
//   console.log(test.length)
//   console.log(test.map(a => a.beatmapset.preview_url))
//   console.log(test2.map(a => a.beatmapset.preview_url))
//   console.log(test3.map(a => a.beatmapset.preview_url))

//   // let temp = test.map(beatmap => {
//   //   beatmap["beatmapset"]["preview_url"]
//   // })
//   res.status(200).send(test)
//   // res.status(200).send(test)

// });

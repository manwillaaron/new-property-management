require("dotenv").config({ path: __dirname + "/../.env" });
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const ac = require("./controllers/adminController.js");
const pc = require("./controllers/propertyController");
const rc = require("./controllers/renterController");
const sc = require("./controllers/stripeController");
const sockc = require("./controllers/socketController");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCheck = require("./middleware/authCheck");
const initSession = require("./middleware/initSession");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors=  require('cors')

const client = require("twilio")(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(express.json());

app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 36
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  console.log("db is all good");
  app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
  app.set("db", db);
});

app.use(initSession);

//admin
app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.delete("/api/signout", ac.signout);
// app.get("/api/renterCheck", ac.renterCheck);

app.use(authCheck)

app.get("/api/admin", ac.getAdmin);
//property
app.get("/api/properties", pc.getProperties);
app.put("/api/properties/:propertyId", pc.editProperty);
app.delete("/api/properties/:propertyId", pc.deleteProperty);
app.post("/api/property/add", pc.addProperty);

//renters
app.get("/api/renters/:propertyId", rc.getRenters);
app.post("/api/renter/add", rc.addRenter);
app.put("/api/renter/edit/:admin_id", rc.editRenter);
app.delete("/api/renter/delete/:admin_id", rc.deleteRenter);
app.get("/api/all/renters", rc.getAllRenters);

//Socket
app.get("/api/messages/:admin_id", sockc.getMessages);
app.get("/api/chatrooms/:admin_id", sockc.getAllChatrooms);
app.post("/api/newmessage", sockc.saveMessage);
app.delete('/api/delete/message/:message_id', sockc.deleteMessage);


io.on("connection", socket => {
  console.log("A connection happened", socket.id);
  socket.on("needy", roomid => sockc.joinRoom(roomid, socket, io));
  socket.on("message to server", payload =>
    sockc.sendMessageToRoom(payload, io)
  );
});
//stripe
app.post("/api/payment", sc.pay);
app.use(express.static(__dirname + "/../build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});


// twillio

app.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");
  client.messages
  .create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+1${req.body.to}`,
    body: req.body.body
  })
  .then(() => {
    res.send(JSON.stringify({ success: true }));
  })
  .catch(err => {
    console.log("?????????????????", err);
    res.send(JSON.stringify({ success: false }));
  });
});

app.use( express.static( `${__dirname}/../build` ) );

server.listen(4000, () => console.log("listening"));

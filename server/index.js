require('dotenv').config({ path: __dirname + '/../.env' });
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const ac = require('./controllers/adminController.js');
const pc = require('./controllers/propertyController');
const rc = require('./controllers/renterController');
const sc = require('./controllers/stripeController');
const sockc = require('./controllers/socketController');
const ec = require('./controllers/expenseController');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCheck = require('./middleware/authCheck');
const is = require('./middleware/initSession');
const app = express();
const cors = require('cors');
const path = require('path');
// const client = require('twilio')(
//   process.env.TWILIO_ACCOUT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
app.use(cors());

app.use(express.json({ extended: false }));

app.use(is);
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

app.use((req, res, next) => {
  app.set('sesh', req.session);
  next();
});

massive(CONNECTION_STRING).then(async db => {
  app.set('db', db);
  console.log('db is all good');

  io = require('socket.io')(
    app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
  );

  io.on('connection', async socket => {
    console.log('A connection happened', socket.id);
    const objs = { db: app.get('db'), io, socket };

    socket.on('needy', admin_id => {
      sockc.joinRoom(admin_id, app.get('sesh').admin, objs);
    });

    socket.on('delete message', ({messageId, chatroomId}) =>
      sockc.deleteMessage(messageId, app.get('db'),chatroomId, io)
    );

    socket.on('message to server', payload => {
      sockc.sendMessageToRoom(payload, app.get('sesh').admin, objs);
    });
  });
});

//Socket
app.get('/api/chatrooms/:admin_id', sockc.getAllChatrooms);

//admin
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.delete('/api/signout', ac.signout);

// app.use(authCheck); 

app.get('/api/admin', ac.getAdmin);
//property
app.get('/api/properties', pc.getProperties);
app.put('/api/properties/:propertyId', pc.editProperty);
app.delete('/api/properties/:propertyId', pc.deleteProperty);
app.post('/api/property/add', pc.addProperty);

//expenses
app.get('/api/expenses/:id', ec.getExpenses)
app.get('/api/current/expenses', ec.getAdminExpenses)
app.post('/api/add/expense', ec.addExpense)

//renters
app.get('/api/renters/:propertyId', rc.getRenters);
app.post('/api/renter/add', rc.addRenter);
app.put('/api/renter/edit/:admin_id', rc.editRenter);
app.delete('/api/renter/delete/:admin_id', rc.deleteRenter);
app.get('/api/all/renters', rc.getAllRenters);

//stripe
app.post('/api/payment', sc.pay);

// twillio

// app.post('/api/messages', (req, res) => {
//   console.log(req.body);
//   const num = `+1${req.body.to}`;
//   res.header('Content-Type', 'application/json');
//   client.messages
//     .create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: num,
//       body: req.body.body
//     })
//     .then(() => {
//       console.log('sent successfully');
//       res.send(JSON.stringify({ success: true }));
//     })
//     .catch(err => {
//       console.log('MESSAGE FAILED', err);
//       res.send(JSON.stringify({ success: false }));
//     });
// });


app.use( express.static( `${__dirname}/../build`));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


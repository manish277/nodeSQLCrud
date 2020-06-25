const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http')

const app = express();
const server = http.createServer(app)
var corsOptions = {
  origin: "http://46.246.120.148:8452"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with, Content-Type,Accept");
  res.header("Access-Control-Allow-Origin", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});
const db = require("./models");
db.sequelize.sync();


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Twitter application." });
});

require("./routes/user.routes")(app);
require("./routes/twitter.routes")(app);
require("./routes/agent.routes")(app);
require("./routes/adminUser.routes")(app);
require("./routes/client.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8452;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// server.listen(8452, '127.0.0.1',function(){
//   console.log(`server listen on ip 127.0.0.1 port ${PORT} `)
// })
// server.listen(8080, '127.0.0.1', function () {
//   server.close(function () {
//     // server.listen(8452, '46.246.120.148')
//   })
// })
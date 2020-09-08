require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const db = require('./src/models/Content_sequelize');
const app = express();
const helmet = require('helmet');
// require('./src/routes/auth.routes')(app);
// require('./src/routes/user.routes')(app);

// db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//    initial();
//  });

//  var corsOptions = {
//    origin: "http://localhost:8081"
//  }
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', require('./src/routes/routes2'));

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



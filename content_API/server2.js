const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/models/Content_sequelize');
const app = express();
const helmet = require('helmet');


db.sequelize.sync();
//db.sequelize.sync({ force: true }).then(() => {
 //   console.log("Drop and re-sync db.");
 // });

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple route
//app.get("/api", (req, res) => {
//   res.json({ message: "Welcome to Wonderland application." });
//});
app.use('/api', require('./src/routes2'));

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

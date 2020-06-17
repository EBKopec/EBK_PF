const express = require('express');
const routes = express.Router();


const ContentController = require('./controllers/ContentController');

//Route
routes.get("/content", ContentController.index);
//routes.get("/content/:id", ContentController.show);
//routes.post("/content", ContentController.store);
//routes.put("/content/:id", ContentController.update);
//routes.delete("/content/:id", ContentController.destroy);


module.exports = routes;


const express = require('express');
const routes = express.Router();


const ContentController = require('./controllers/ContentController2');

//Route
routes.get("/content", ContentController.index);
//routes.get("/content/:id", ContentController.show);
routes.post("/content", ContentController.create);
routes.put("/content/:id", ContentController.update);
routes.delete("/content/:id", ContentController.delete);

routes.get("/content/:id/maincontent", ContentController.indexMainContent);
routes.get("/content/:id", ContentController.showMainContent);
routes.post("/maincontent", ContentController.createMainContent);


module.exports = routes;
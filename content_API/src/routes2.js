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

//reports
routes.get("/billing", ContentController.showBillingPMPG);
routes.post("/billing/:id", ContentController.showBillingPMPGParam);
// console.log("Rota:", routes.get("/billing/:id", ContentController.showBillingPMPGParam));
routes.get("/pmpg_0800", ContentController.showBillingPMPG_0800);

module.exports = routes;

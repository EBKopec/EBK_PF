const express = require('express');
const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const routes = express.Router();

const ContentController = require('../controllers/ContentController2');
const ResumeConsumeController = require('../controllers/ResumeConsumeController');
const ExtensionsController = require('../controllers/ExtensionsController');

const YMController = require('../controllers/YMController');
const SRCUtils = require('../controllers/SrcUtilsController');

const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');

//Route
routes.get("/content", ContentController.index);
//routes.get("/content/:id", ContentController.show);
routes.post("/content", ContentController.create);
routes.put("/content/:id", ContentController.update);
routes.delete("/content/:id", ContentController.delete);

//Content
routes.get("/content/:id/maincontent", ContentController.indexMainContent);
routes.get("/content/:id", ContentController.showMainContent);
routes.post("/maincontent", ContentController.createMainContent);

//reports
//Detailed
routes.get("/billing", ContentController.showBillingPMPG);
routes.get('/resumeConsume/:id', ResumeConsumeController.showResumeConsume);
routes.post("/billing/:id/:mes_id", ContentController.showBillingPMPGParam);

//ExtensionsQty
routes.get("/extensionqty/:mes_id", ExtensionsController.showExtensionsQty);
routes.get("/extmonth/:mes_id", ExtensionsController.showExtMonth);

// Utils
routes.get("/year", YMController.showYear);
routes.get("/month", YMController.showMonth);
routes.get("/src/:id/:mes_id", SRCUtils.showPath);
routes.get("/download/:id/:mes_id", SRCUtils.download);

routes.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    AuthController.signup
  );

routes.post("/auth/signin", AuthController.signin);
routes.get("/test/all", UserController.allAccess);

routes.get(
  "/test/user",
  [authJwt.verifyToken],
  UserController.userBoard
);

routes.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  UserController.moderatorBoard
);

routes.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.adminBoard
);

module.exports = routes;

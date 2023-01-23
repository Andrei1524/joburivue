import express, { Request } from "express";
const router = express.Router();
import path from "path";
import fs from "fs";
import { authenticateJWT } from "../middleware/authenticateJWT";

import * as CompanyController from "../controllers/company.controller";

const storageFolder = "./uploads/";

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    if (!fs.existsSync(storageFolder)) {
      fs.mkdir(storageFolder, (err) => {
        cb(null, storageFolder);
      });
    } else {
      cb(null, storageFolder);
    }
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = function (req: Request, file: any, cb: any) {
  // if file is not an image
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post(
  "/create",
  authenticateJWT,
  upload.single("logoFile"),
  CompanyController.createCompanyValidate,
  CompanyController.create
);

router.get(
  "/userCompanies",
  authenticateJWT,
  CompanyController.getUserCompanies
);

export = router;

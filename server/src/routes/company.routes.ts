import express, { Request } from 'express';
const router = express.Router();
import path from 'path';
import fs from 'fs';
import { authenticateJWT } from '../middleware/authenticateJWT';
const fsExtra = require('fs-extra');

import * as CompanyController from '../controllers/company.controller';

const storageFolder = './uploads/';

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    const storageId = req.params.storageId;

    const storageDir = storageFolder + storageId;

    // this saves photo to storage ref
    if (!fs.existsSync(storageDir)) {
      fs.mkdir(storageDir, (err) => {
        cb(null, storageDir);
      });
    } else {
      // clear div of the photo after uploading another

      fsExtra.emptyDirSync(storageDir);
      cb(null, storageDir);
    }
  },
  filename: function (req: Request, file: any, cb: any) {
    const ext = file.originalname
      .split('.')
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join('.');

    cb(null, new Date().toISOString().replace(/:/g, '-') + '.' + ext);
  },
});

const fileFilter = function (req: Request, file: any, cb: any) {
  // if file is not an image
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
  '/create/:storageId',
  authenticateJWT,
  upload.single('logoFile'),
  CompanyController.createCompanyValidate,
  CompanyController.create
);

router.get(
  '/userCompanies',
  authenticateJWT,
  CompanyController.getUserCompanies
);

export = router;

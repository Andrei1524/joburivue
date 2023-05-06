import express, { Request } from 'express';
const router = express.Router();
import fs from 'fs';
import { authenticateJWT } from '../middleware/authenticateJWT';
const fsExtra = require('fs-extra');

import * as CompanyController from '../controllers/company.controller';
import companyBelongsToCurrentUser from '../middleware/companyBelongsToCurrentUser';

const storageFolder = './uploads/';

const multer = require('multer');
const storage = multer.diskStorage({
  destination: async function (req: Request, file: any, cb: any) {
    const storageId = req.params.storageId;

    const storageDir = storageFolder + storageId;

    const savePhotoToFolder = (folder: any) => {
      fs.mkdir(storageDir, { recursive: true }, (err) => {
        if (err) throw err;

        // clear div of the photo after uploading another
        fsExtra.emptyDirSync(storageDir);
        cb(null, folder);
      });
    };

    savePhotoToFolder(storageDir);
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

// TODO: dont allow another user to delete another user company
router.delete(
  '/:id',
  authenticateJWT,
  companyBelongsToCurrentUser,
  CompanyController.deleteCompany
);

export = router;

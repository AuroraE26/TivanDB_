require("dotenv").config();
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
})

const s3Config = new AWS.S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  Bucket: bucketName
})

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: bucketName,
  acl: 'public-read',
  contentType: function (req, file, cb) {
    cb(null, file.mimetype)
  },
  metadata: function (request, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (request, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`)
  }
})

const uploadFile = multer({
  storage: multerS3Config,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

module.exports = uploadFile

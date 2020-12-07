const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const aws = require('../../config/');
const { Campaign } = require('../../db/models');

const router = express.Router();


// configuring the DiscStorage engine.
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// const upload = multer({ storage: storage });
const upload = multer();

//setting the credentials
//The region should be the region of the bucket that you created
//Visit this if you have any confusion - https://docs.aws.amazon.com/general/latest/gr/rande.html
AWS.config.update({
    accessKeyId: aws.access,
    secretAccessKey: aws.secret,
    region: 'US East (Ohio) us-east-2',
});

//Creating a new instance of S3:
const s3 = new AWS.S3();

const fileFilter = (req, res, next) => {
    const file = req.files[0];
    if(file.mimeType === "image/jpeg" || file.mimeType === "image/png"){
        next();
    } else {
        next({status: 422, errors: ["Invalid mime type, file must be JPEG or PNG"]});
    }
}
//POST method route for uploading file
router.post('/upload', upload.any(), fileFilter, async (req, res) => {
    //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
    //req.file is the demo_file
    // uploadFile(req.file.path, req.file.filename, res);

    const file = req.files[0];

    const params = {
        Bucket: aws.bucket,
        key: Date.now().toString() + file.originalname,
        body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimeType,
    }

    const promise = s3. upload(params).promise();

    const uploadedImage = await promise;
    const imageURL = uploadedImage.Location;


})

//The uploadFile function
function uploadFile(source, targetName, res) {
    console.log('preparing to upload...');
    fs.readFile(source, function (err, filedata) {
        if (!err) {
            const putParams = {
                Bucket: aws.bucket,
                Key: targetName,
                Body: filedata
            };
            s3.putObject(putParams, function (err, data) {
                if (err) {
                    console.log('Could nor upload the file. Error :', err);
                    return res.send({ success: false });
                }
                else {
                    fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
                    console.log('Successfully uploaded the file');
                    return res.send({ success: true });
                }
            });
        }
        else {
            console.log({ 'err': err });
        }
    });
}


module.exports = router;
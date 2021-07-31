import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import  express from 'express';
import  bodyParser from 'body-parser';
import  formidable from 'formidable';
import  fs from 'fs';
import  path from 'path';
import ejs from 'ejs';
// const bodyParser = require('body-parser');
// const formidable = require('formidable');
// var fs = require('fs');
// const path = require('path');
var file;
const app = express()
app.engine("html", ejs.renderFile);
app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html')
})

app.post('/upload', (req, res, next) => {

    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        // var oldPath = files.someExpressFiles.path;
        // var newPath = path.join(__dirname, 'uploads')
        //         + '/'+files.someExpressFiles.name
        // var rawData = fs.readFileSync(oldPath)

        // fs.writeFile(newPath, rawData, function(err){
        //     if(err) console.log(err)
        //     // return res.send("Successfully uploaded")

        // })
        file = files;
        console.log("Runpose");
        runPose(file);
    })
});

async function runPose(files){
    console.log('started');
 const detectorConfig = {
     modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
 };
 const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
 const poses =  await detector.estimatePoses(files);
 console.log(poses);
 return res.send(poses);
}


app.listen(3000, () => {
    console.log('listening to port 3000');
})
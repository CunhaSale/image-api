import * as express from 'express';
import * as multer from 'multer';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

export let UPLOAD_PATH = 'uploads';
export let PORT = 3000;

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, UPLOAD_PATH)
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

export let upload = multer({ storage: storage });

export const app = express();
app.use(cors());

var routes = require('./routes');

let uri = 'mongodb://localhost/imageupload';
mongoose.connect(uri, (err) => {
    if (err){
        console.log(err)
    } else{
        console.log('Connected with MongoDB');
    }
});

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});
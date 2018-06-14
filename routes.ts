import { UPLOAD_PATH, app, upload} from './server';
import { Image } from './image';
import * as path from 'path';
import * as fs from 'fs';
import * as del from 'del';

app.post('/images', upload.single('image'), (req, res, next) => {
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc;
    newImage.save(err => {
        if(err){
            return res.sendStatus(400);
        }
        res.status(201).json(newImage);
    })
});

app.get('/images', (req, res, next) => {
    Image.find({}, '-__v').lean().exec((err, images) => {
        if(err){
            return res.sendStatus(400);
        }
        for(let i = 0; i < images.length; i++){
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    });
});

app.get('/images/:id', (req, res, next) => {
    let imgId = req.params.id;
    Image.findById(imgId, (err, image) => {
        if(err){
            return res.sendStatus(400);
        }
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res)
    });
});

app.delete('/images/:id', (req, res, next) => {
    let imgId = req.params.id;
    Image.findByIdAndRemove(imgId, (err, image) => {
        if(err){
            return res.sendStatus(400);
        }
        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200);
        });
    });
});


const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const formidable = require('formidable')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect("index.html");
});
app.post('/download', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/public/mapFiles/' + file.name;
    });
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    res.send("success");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
const express = require('express');
const compression = require('compression')

const app = express();
app.use(compression());

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});


const port = process.env.PORT || 3000;
console.log('Running app on port', port);
app.listen(port);

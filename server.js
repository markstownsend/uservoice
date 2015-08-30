var express = require('express');
var app = express();

app.use(express.static(__dirname + '/2f92825aa8a94515347a'));

app.listen(process.env.PORT || 3898);
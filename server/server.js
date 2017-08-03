'use strict';

const express = require('express');
const cors    = require('cors');
const _       = require('lodash');
const morgan  = require('morgan');
const delay   = require('express-delay');

const app = express();

app.use(cors());
app.use(morgan('[:date[clf]] :remote-addr :method :url :status [:response-time ms]'));
app.use(delay(0, 1000));


app.get('/',function(req,res){
    res.send("Use /temperature, /precipitation, /wind/speed, /wind/direction, /humidity");
});


app.get('/precipitation',function(req,res){
    const values = [
        null,
        'rain',
        'hail',
        'snow',
        'lightning',
        'thunderstorm',
        'meteor',
    ];
    res.json({result:_.sample(values)});
});


const getRandomFromRange = (min,max) => {
    return min + Math.round(Math.random()*(max-min));
};


app.get('/wind/speed',function(req,res){
    const result = getRandomFromRange(0,30);
    res.json({result});
});


app.get('/wind/direction',function(req,res){
    const values = [
        'n',
        'nne',
        'ne',
        'ene',
        'e',
        'ese',
        'se',
        'sse',
        's',
        'ssw',
        'sw',
        'wsw',
        'w',
        'wnw',
        'nw',
        'nnw',
    ];
    res.json({result:_.sample(values)});
});


app.get('/temperature',function(req,res){
    const result = getRandomFromRange(-10,40);
    res.json({result});
});


app.get('/humidity',function(req,res){
    const result = getRandomFromRange(15,95);
    res.json({result});
});


const port = process.env.PORT || 8081;


app.listen(port, function(){
    console.log(`App started on ${port}`);
});

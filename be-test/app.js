var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var methodOverride = require('method-override')
const cors = require('cors');

var app = express();

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const { decodeToken } = require('./app/auth/middleware');
const Auth = require('./app/auth/router');
const api = require('./routes/api');

const Banner = require('./app/banner/router');

app.use(cors());
app.use(decodeToken());

app.use('/api', api);

// ADMIN ROUTES
app.use('/auth', Auth);
app.use('/banners', Banner);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        error : err
    });
});

module.exports = app;

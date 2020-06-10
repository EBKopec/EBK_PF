const express       = require('express');
const app           = express();
const path          = require('path');
const mysql         = require('mysql');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session')(session);
const Router        = require('./Router');



app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

console.log('Testing Server');
//Database
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'novafibra',
    password: 'novafibra',
    database: 'novafibra'
});

db.connect(function(err){
    if (err){
        console.log('DB error');
        throw err;
        return false;
    }
});
console.log('Testing Server2');

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false,
}, db);

app.use(session({
    key:'erew23fweijej',
    secret: 'auhaeoaekopj23q33',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }   
}));

console.log('Testing Server3');

new Router(app, db);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);

console.log('Testing Server4');
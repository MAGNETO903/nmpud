
// алхимический квест
/*
https://yandex.ru/games/play/199672/?draft=true&game_url=https://localhost:8443
*/

// загрузка тех. модулей
const express = require('express'); //фреймворк
const app = express()
var fs = require('fs');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('certificate.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const router = express.Router();
const http = require('http')
const https = require('https')
const { Client } = require('pg')
var bodyParser = require('body-parser');

//const server = require('https').createServer(options, app); //сервер
const port = process.env.PORT || 3000; //активный порт


const cur_dir = '/public'



const connect_str = "postgres://uptnwmzzkwicwg:7acceb845514472f0c2363e5550b1d933974cb879dd7d7e63eb7a432353ca011@ec2-63-34-223-144.eu-west-1.compute.amazonaws.com:5432/daee65gi6qvsos"


// подключаемся к БД
const client = new Client({
  connectionString: connect_str,
  ssl: { rejectUnauthorized: false }
});

//client.connect();

/*
var command = `CREATE TABLE system_logs (
  id serial PRIMARY KEY,
  data json
);`
client.query(command, (err, res) => {
  if (err) {
    console.log(err);
  } else for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
})
*/

// подготовка
app.use(express.static(__dirname + cur_dir));


app.use(bodyParser.json()) // note: this is before the route
app.use((req, res, next) => {
   next();
});

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.post('/report', (req, res) => {
  console.log(req.body)
  if (!req.body) return res.sendStatus(400)

  res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Credentials", "true");
	res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
  data = {
    "name": "Tony Stark",
  }
  res.send(JSON.stringify(data))
})

app.use(express.json())
// запуск сервера
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
httpsServer.listen(8443);

// уведомление о запуске
console.log(cur_dir)
console.log('The server avialable at', port);

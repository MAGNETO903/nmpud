// загрузка тех. модулей
const express = require('express'); //фреймворк
const app = express()
const cors = require('cors')
const server = require('http').Server(app); //сервер
const port = process.env.PORT || 3000; //активный порт
const restler = require('restler');
const querystring = require('querystring');
const nerdamer = require('nerdamer');
const bodyParser = require('body-parser');
const io = require('socket.io')(server)

const fs = require("fs");

const { Client } = require('pg')

const connect_str = "postgres://gocbkenodcpgoz:d177c4713c73ed80cc3264dacccce40e22af7aa3d47f95cbd30cb701b318934b@ec2-54-146-142-58.compute-1.amazonaws.com:5432/d3ndne7rqbci5h"


// подключаемся к БД
const client = new Client({
  connectionString: connect_str,
  ssl: { rejectUnauthorized: false }
});

client.connect();

// загрузка личных модулей
//var rnd40_64 = require("./random_generator.js");
//var get_graph_5 = require("./functions.js").get_graph_5;
//var get_hist_5 = require("./functions.js").get_hist_5;
//var get_model_formula = require("./functions.js").get_model_formula;

var process_date = function(date) {
  return date.getFullYear() + "-" + (Number(date.getMonth())+1) + "-" + date.getDate() + "|" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

var save_log = function(data) {
  var date = data.date.split("|")[0];
  var time = data.date.split("|")[1];
  var username = data.name;
  var action = data.action;
  var data = JSON.stringify(data.data)
  var command = `INSERT INTO system_logs (date, time, username, action, data) \n Values('${date}', '${time}', '${username}', ${action}, '${data}');`
  console.log(command)
  client.query(command, (err, res) => {
  if (err) {
    console.log(err);
  } else for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  //client.end();
});
  //var file = JSON.parse(fs.readFileSync('log.json', 'utf-8'))
  //file.log.push(data)
  //fs.writeFileSync('log.json', JSON.stringify(file, null, 2));
  
}

// список пользователи
var users = [{
  "nickname": "Admin",
  "real_name": "Данил Черкашин Андреевич",
  "access": 3,
  "password": "438253"
}, {
  "nickname": "test_user",
  "real_name": "тестовый пользователь",
  "access": 1,
  "password": "-"
}]

var users_info = [
'Бабаскина Екатерина Владимировна',
'Белов Артем Алексеевич',
'Борисенко Софья Вячеславовна',
'Братенков Мирон Андреевич',
'Гусев Иван Александрович',
'Железко Татьяна Евгеньевна',  
'Кармушин Степан Романович', 
'Керимова Диана',  
'Ковалевская Ольга Артемовна', 
'Коноплев Вадим Евгеньевич',
'Легченко Антон  Евгеньевич', 
'Листопадова Дарья Константиновна', 
'Литвиненко Дмитрий Евгеньевич',
'Новохатский Аркадий Петрович',
'Пазиева Екатерина Олеговна',
'Парунин Иван Дмитриевич',
'Пилипушко Леонид Владимирович',
'Попадейкина Елизавета Александровна',
'Смирнов Иван Андреевич',
'Чохар Видана Игоревна ',
'Макаров Николай',
'Байков Константин Сергеевич', 
'Братчиков Денис Сергеевич',
'Васильев Владимир Егорович', 
'Воробьева Диана Александровна', 
'Гончар Александра Владимировна',
'Дмитрачков Данил Константинович', 
'Дюбенкова Анастасия Сергеевна', 
'Захарцева Дарья Борисовна', 
'Иванова Виктория Витальевна',
'Карпенко Данил Евгеньевич',
'Кладов Данил Евгеньевич',
'Корницкий Богдан Владимирович',
'Ладыгин Илья Сергеевич',
'Межевых Валерия Сергеевна',
'Панарин Алексей Сергеевич',
'Резник Иван Юрьевич',
'Рыжков Данил Валерьевич',
'Сапожников Вячеслав Алексеевич',
'Степанищев Степан Владимирович',
'Утюпин Степан Юрьевич',
'Хан Ксения Евгеньевна',
'Куснатдинов Тимур  Русланович',
'Сурнин Павел Сергеевич',
'Авзалов Дмитрий Рафаилович',
'Аксюк Иван Алексеевич',
'Алехин Дмитрий Андреевич',
'Бухашеев Олег Владимирович',
'Кочарина Алена Романовна',
'Куликова Дарья Константиновна',
'Лекомцев Александр Михайлович',
'Мартюшова Елизавета',
'Налоева Ольга Александровна',
'Поликанова Виктория Сергеевна',
'Притупов Никита Витальевич',
'Рогачева Анна Константиновна', 
'Хлыбова Наталия Олеговна',
'Шаранов Дмитрий Александрович',
'Шафигулин Игорь Андреевич', 
'Шуваев Денис Михайлович',
'Галушкин Артур Дмитриевич',
'Еремкин Вячеслав Игоревич', 
'Тархова Анна Евгеньевна',
'Дремина Софья Андреевна',
'Аземова Алтынай Талантбековна', 
'Аминов Андрей Андреевич',
'Афанасьев Владимир Анатольевич', 
'Биркин Илья Александрович',
'Вотинцева Дарья Игоревна',
'Галиуллин Михаил Владимирович',
'Глазков Степан Павлович',
'Долганов Илья Витальевич',
'Карпова Анастасия Андреевна',
'Каххаров Илья Исмаилович',
'Кискидосов Дмитрий Андреевич',
'Меньщиков Михаил Романович',
'Мочалов Игорь Сергеевич',
'Пилипенко Марина Вадимовна',
'Приходько Евгения Васильевна',
'Слепцов Ефрем Андреевич',
'Стародубцев Данил Владимирович',
'Татаринова Елизавета Анатольевна',
'Фомичева Дарья Павловна',
'Шаламов Никита Андреевич',  
'Шишин Константин Сергеевич',
'Пролыгин Артем Павлович',
'Шевко Елизавета Артемовна',
'Федотов Артем Владимирович'
]

users_info.sort()

users_info.unshift('Войтишек Антон Вацлавович')
users_info.unshift('Наталья Валерьевна Трачёва')
users_info.unshift("Черкашин Данил Андреевич")
users_info.unshift("Постовалов Ярослав Сергеевич")
users_info.unshift("Буцковский Кирилл Антонович")

var active_users = []

io.on('connection', function(socket) {
  console.log("Someone connected!")
  socket.emit('users', users_info);

  socket.on('register', function(data) {
    var date = new Date(new Date().toUTCString())
    console.log(socket.id)
    for (var i=0; i < active_users.length; i++) {
      if (active_users[i].id == socket.id) {
        var info = {
          "date": process_date(date),
          "name": active_users[i].name,
          "action": 2,
          "data": {

          }
        }
        save_log(info)
        active_users.splice(i, 1)
        break;
      }
    }
    var info = {
      "date": process_date(date),
      "name": data,
      "action": 1,
      "data": {

      }
    }
    save_log(info)
    var date_str = process_date(date);
    console.log(date_str, "- пользователь авторизовался как", data)
    active_users.push({"id": socket.id, "name": data})
  })

  socket.on('generated_hist', function(data) {
    var date = new Date(new Date().toUTCString())
    var info = {
      "date": process_date(date),
      "action": 4,
      "name": data.name,
      "data": {
        "expr": data.expr,
        "type": 'hist',
        "tex_expr": data.tex_expr,
        "options": data.options
      }
    }
    //console.log(info)
    save_log(info)
    //console.log(date_str, "- пользователь ", data.name, "сгенерировал новую гистограмму")
  })

  socket.on('generated_graph', function(data) {
    var date = new Date(new Date().toUTCString())
    var info = {
      "date": process_date(date),
      "action": 3,
      "name": data.name,
      "data": {
        "expr": data.expr,
        "tex_expr": data.tex_expr,
        "type": 'graph',
        "options": data.options
      }
    }
    //console.log(info)
    save_log(info)
  })

  socket.on('disconnect', function() {
    for (var i=0; i < active_users.length; i++) {
      if (active_users[i].id == socket.id) {
        var date = new Date(new Date().toUTCString())
        var info = {
          "date": process_date(date),
          "name": active_users[i].name,
          "action": 2,
          "data": {

          }
        }
        save_log(info)
        //var date_str = process_date(date);
        //console.log(date_str, "- пользователь", active_users[i].name, " вышел из системы")
        active_users.splice(i, 1)
      }
    }
  })

})

// подготовка
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());




// запуск сервера
server.listen(port);

// уведомление о запуске
console.log('The server avialable at', port);

// проверка на наличие файла log.json
fs.access("log.json", fs.F_OK, (err) => {
  if (err) {
    //console.error(err)
    var empty_file = {
      "log": []
    }
    fs.writeFileSync("log.json", JSON.stringify(empty_file, null, 2))
    return
  }

  //file exists
})























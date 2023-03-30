// загрузка тех. модулей
const express = require('express'); //фреймворк
const app = express()
const cors = require('cors')
const server = require('http').Server(app); //сервер
//const port = process.env.PORT || 3000; //активный порт
var port = 3000
//const restler = require('restler');
const querystring = require('querystring');
//const nerdamer = require('nerdamer');
//const bodyParser = require('body-parser');
const io = require('socket.io')(server)

const fs = require("fs");

const { Client } = require('pg')

//const connect_str = "postgres://ihsldngbqytdhn:79ce14241351340b35e3767ea443c28d41ac3057a1d08caeae60b57526662dfb@ec2-44-205-159-94.compute-1.amazonaws.com:5432/d4qgpgdcl49fr1"
//const connect_str = "postgres://gocbkenodcpgoz:d177c4713c73ed80cc3264dacccce40e22af7aa3d47f95cbd30cb701b318934b@ec2-54-146-142-58.compute-1.amazonaws.com:5432/d3ndne7rqbci5h"
const connect_str = 'postgres://nmpud_db_user:ii0WAYpPEK6ZcEbK9K4nkg1kTWQAOD3o@dpg-ce55mpda499e19j1a6j0-a.frankfurt-postgres.render.com/nmpud_db'


// подключаемся к БД
/*
const client = new Client({
  connectionString: connect_str,
  ssl: { rejectUnauthorized: false }
});
*/
//client.connect();

// загрузка личных модулей
//var rnd40_64 = require("./random_generator.js");
//var get_graph_5 = require("./functions.js").get_graph_5;
//var get_hist_5 = require("./functions.js").get_hist_5;
//var get_model_formula = require("./functions.js").get_model_formula;

var process_date = function(date) {
  return date.getFullYear() + "-" + (Number(date.getMonth())+1) + "-" + date.getDate() + "|" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

/*
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
*/

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
  'Александров Евгений Евгеньевич',
  'Ипполитов Макар Сергеевич',
  'Керимова Диана',
  'Кудрявцева Анна Алексеевна',
  'Кшинина Екатерина Андреевна',
  'Матей Андрей Августович',
  'Мошнова Ксения Дмитриевна',
  'Паксюткин Артем Алексеевич',
  'Першин Андрей Дмитриевич',
  'Петрова Анна Александровна',
  'Прядкин Егор Андреевич',
  'Рыжков Даниил Викторович',
  'Сатров Михаил Анатольевич',
  'Сергеева Валерия Евгеньевна',
  'Тимофеева Ольга Васильевна',
  'Чохар Видана Игоревна',
  'Шаблыко Василий Кириллович',
  'Журенков Яков Андреевич',
  'Чжан Тао',
  'Чао Хуэй',
  'Шлымбетов Нурлыбай Хамдуллаевич',
  'Акентьев Всеволод Владиславович',
  'Ван Синьюй',
  'Гилёва Ксения Ивановна',
  'Ду Сыюань',
  'Кирсанов Семен Олегович',
  'Ковалевский Данил Анатольевич',
  'Кригерт Николай Викторович',
  'Ляпин Александр Иванович',
  'Макаренко Илья Дмитриевич',
  'Монгуш Чингиз Омарович',
  'Ряженова Алевтина Антоновна',
  'Стрепетова Виталия Вадимовна',
  'Су Суанью',
  'Турнаев Александр Михайлович',
  'Хотина Алисия Вячеславовна',
  'Хэ Шичжэ',
  'Царева Алена Витальевна',
  'Чжао Липин',
  'Янбулатов Денис Ринатович',
  'Шелепова Анстасия',
  'Барбара Никита Евгеньевич',
  'Григорьевская Анжелика Анатольевна',
  'Изотов Александр Евгеньевич',
  'Колганова Арина Валентиновна',
  'Куликова Дарья Константиновна',
  'Леонтьева Валерия Геннадьевна',
  'Парунин Иван Дмитриевич',
  'Плешков Алексей Алексеевич',
  'Сортоева Ксения Алексеевна',
  'Федорова Анастасия Игоревна',
  'Халявин Олег Дмитриевич',
  'Шафигулин Игорь Андреевич',
  'Деулина Анна Алексеевна',
  'Иванова Екатерина Николаевна',
  'Иванова Юлия Андреевна',
  'Лоевец Эвелина Руслановна',
  'Абдулатыпов Руслан Ренатович',
  'Арнольд Александра Юрьевна',
  'Глушенко Владислав Валерьевич',
  'Гудылин Иван Сергеевич',
  'Гусарева Надежда Сергеевна',
  'Друзева Диана Константиновна',
  'Ефремов Михаил Евгеньевич',
  'Казанцев Артем Сергеевич',
  'Кесаев Александр Сергеевич', 
  'Ковалев Александр Николаевич',
  'Ковылина Полина Константиновна',
  'Назаров Василий Сергеевич',
  'Новоселов Илья Виторович',
  'Попов Алексей Сергеевич',
  'Сталидзан Анастасия Витальевна',
  'Тимошенко Екатерина Вячеславовна',
  'Фроленко Иван Игоревич',
  'Цыганов Антон Александрович',
  'Шевелев Евгений Игоревич'
]

users_info.sort()

users_info.unshift('Войтишек Антон Вацлавович')
users_info.unshift('Наталья Валерьевна Трачёва')
users_info.unshift("Черкашин Данил Андреевич")
users_info.unshift("Постовалов Ярослав Сергеевич")
users_info.unshift("Буцковский Кирилл Антонович")

var valid = function(info) {
  var valid_name = info.name == '' || users_info.includes(info.name)

  var valid_date = true

  

  return valid_name && valid_date
}

var active_users = []
/*
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
        if (valid(info)) {
          save_log(info)
        }
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
    if (valid(info)) {
      save_log(info)
    }
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
    if (valid(info)) {
      save_log(info)
    }
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
    if (valid(info)) {
      save_log(info)
    }
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
        if (valid(info)) {
          save_log(info)
        }
        //var date_str = process_date(date);
        //console.log(date_str, "- пользователь", active_users[i].name, " вышел из системы")
        active_users.splice(i, 1)
      }
    }
  })

})
*/

// подготовка
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json())
//app.use(cors());

// запуск сервера
server.listen(port);

// уведомление о запуске
console.log('The server avialable at', port);

// проверка на наличие файла log.json
/*
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
*/

/*
var get_last_log = function() {
  var command = `
  SELECT Id,
    Date,
    Time,
    Username
  FROM system_logs
  ORDER BY Id DESC
  LIMIT 1
`;


 //console.log(command)
  client.query(command, (err, res) => {
  if (err) {
    console.log(err);
  } else for (let row of res.rows) {
    //console.log(row)
    console.log(row)
    return row
    //console.log(JSON.stringify(row));
  }
});
}
*/




/*
var command = `
DELETE FROM system_logs
WHERE Username = user;
`
client.query(command, (err, res) => {
  if (err) {
    console.log(err);
  } else for (let row of res.rows) {
    //console.log(row)
    console.log(row)
    //return row
    //console.log(JSON.stringify(row));
  }
})


*/

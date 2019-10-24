const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8001
var bodyParser = require('body-parser');
var envir = require("./envir").envir;
var route = require("./route");
var restful = require('node-restful');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = "mongodb+srv://tal:postoj-soDmo5-moqmeh@creta-hxs9v.mongodb.net/face?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use('/static', express.static('public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const fileUpload = require('express-fileupload');
 
app.use(fileUpload());

var mqtt = require('mqtt')
var clientMqtt  = mqtt.connect('mqtt://' + envir.mqtt_host);
clientMqtt.on('connect', function () {
  clientMqtt.subscribe('MainApp', function (err) {
    if (!err) {
        clientMqtt.publish('/face/hello', 'Hello mqtt');
        
    }
  });

  clientMqtt.subscribe('/strigger/+', function (err) {
    if (!err) {
        clientMqtt.publish('/face/hello', 'Hello mqtt');
        
    }
  });
  clientMqtt.subscribe('tele/strigger/rf/RESULT', function (err) {
    if (!err) {
        clientMqtt.publish('/face/hello', 'Hello mqtt');
        
    }
  });
})

clientMqtt.on('message', function (topic, message) {
    console.log(message.toString())
})


app.get('/', (req, res) => res.render('index'))
app.get("/camera", function(req, res){
    res.render("camera");
})

app.post('/upload/:type', function(req, res) {
    console.log("TYPE:", req.params.type);
    let type = {};
    if(req.params.type == "record"){
        type.type = ".webm";
        type.link = "record/"
    } else if (req.params.type == "image"){
        type.type = ".png";
        type.link = "img/"
    } else {
        res.send({
            status: "ERROR",
            data: "CANNOT FIND TYPE"
        });
        return;
    }
    //  console.log("aaa:", req.files);
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.data;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv("public/" + type.link + req.body.fname + type.type, function(err) {
        if (err){
            console.log(err)
            return res.status(500).send(err);
        }
        res.send({
            status: "OK",
            data: "/" + type.link + req.body.fname + type.type
        });
    });
});

require('./app/routes/note.routes.js')(app);
require('./app/routes/customer.routes.js')(app);


var topic_main_face = "APIGetPost"
function sendMqttInforCamera(link){
    clientMqtt.publish(topic_main_face, JSON.stringify(link))
}

io.on('connection', function(socket) {
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
    console.log("Connection on");
    clientMqtt.on("message", function(topic, message){
        console.log("ABC:", topic, message);
        socket.emit("message", {topic: topic, message: message.toString()});
    })
    socket.on("image", function(data){
        sendMqttInforCamera(data);
    });
    socket.on("record", function(data){
        sendMqttInforCamera(data);
    })
    socket.on("save_data", function(da){
        console.log("242", da);
        // let str = {};
        let t = new Date();
        // str["note-" + t.getTime().toString()] = da.note;
        if(da.staff == undefined)
            da.staff = 0;
        mongo.rowupdate("face", "customers", {
            $push:{
                note:{
                    date: t,
                    content: da.note,
                    staff: da.staff,
                    price: da.price
                }
            }
        }, {id: da.id}, function(r){
            console.log(r);
        })
    })
    socket.on("check_info", function(da){
        console.log();
        
    })
    socket.on("create_customer", function(da){
        console.log(da);
        let str = {};
        let t = new Date();
        str["note-" + t.getTime().toString()] = da.note;
        mongo.insert("face", "customers", da, function(r){
            console.log(r);
        })
   })
});
http.listen(PORT, () => console.log(`Listening on ${ PORT }`))
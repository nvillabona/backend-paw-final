const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/config');
const Message = require('./models/message');
const { socketController } = require('./controllers/socketController');

const app = express();
const port = process.env.PORT;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors()); // Add CORS middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection
dbConnection();

app.use('/api/', require('./routes'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

// Socket.IO setup
io.on('connection', socket => socketController(socket, io));

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

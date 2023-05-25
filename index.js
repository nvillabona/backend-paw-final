const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/config');
const Message = require('./models/message');
const app = express();
const port = process.env.PORT;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection
dbConnection();

app.use('/api/', require('./routes'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.IO setup
io.on('connection', async (socket) => {
    console.log('A user connected');
    try {
        // Load chat history from MongoDB
        const messages = await Message.find().sort({ timestamp: 1 });

        // Emit chat history to the connected user
        socket.emit('chat history', messages);
    } catch (error) {
        console.error('Error loading chat history:', error);
    }

    // Handle chat messages
    socket.on('chat message', async (msg) => {
        console.log('Message received:', msg);

        // Save the message to MongoDB
        const message = new Message({
            content: msg,
            timestamp: new Date()
        });
        await message.save();

        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

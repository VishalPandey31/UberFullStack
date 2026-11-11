const socketIo = require('socket.io');
const userModel = require('./models/userModel');
const captainModel = require('./models/captainModel');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Jab user ya captain connect ho, unka socketId DB mein save karein
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        // Captain ki live location update
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng) return;

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    latitude: location.ltd,
                    longitude: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

// Specific socketId par message bhejne ke liye function
function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
let users = [];

const addUser = (userId, socketId) => {
    if (!users.some((u) => u.userId === userId)) {
        users.push({ userId, socketId });
    }
};

const getUser = (userId) => {
    return users.find((u) => u.userId === userId);
};

const removeUser = (socketId) => {
    users = users.filter((u) => u.socketId !== socketId);
};

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });

        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);

            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                });
            }
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
        });
    });
};

module.exports = socketHandler;
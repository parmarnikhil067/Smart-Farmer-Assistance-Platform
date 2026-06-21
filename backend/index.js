const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });
const io = new Server(server, {
    cors: {
        origin: "https://smart-farmer-assistance-platform-ds.vercel.app/"

    }
});

app.use(express.json());
app.use(cors({
        origin: "https://smart-farmer-assistance-platform-tx.vercel.app",
        credentials: true,
    }

));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use("/api/mandi", require("./routes/mandiRoutes"));
app.use("/api/contact", contactRoutes);
app.use(
    "/api/messages",
    require(
        "./routes/messageRoutes"
    )
);

// Socket.io
// io.on("connection", (socket) => {
//     socket.on("join", (userId) => socket.join(userId));

//     socket.on("send_message", (data) => {
//         io.to(data.receiver).emit("receive_message", data);
//     });
// });
io.on("connection", (socket) => {

    console.log(
        "User Connected:",
        socket.id
    );

    socket.on(
        "sendMessage",
        async(data) => {

            io.emit(
                "receiveMessage",
                data
            );

        }
    );

    socket.on(
        "disconnect",
        () => {
            console.log(
                "Disconnected"
            );
        }
    );

});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running"));
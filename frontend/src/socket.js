import { io }
from "socket.io-client";

const socket =
    io(
        "https://smart-farmer-backend-p2ap.onrender.com"
    );

export default socket;
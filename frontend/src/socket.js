import { io }
from "socket.io-client";

const socket =
    io(
        "https://smart-farmer-assistance-platform.onrender.com/"
    );

export default socket;
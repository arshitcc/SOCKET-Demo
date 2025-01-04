const socket = io();

const messages = document.getElementById("messages");
const sendMessage = document.getElementById("sendMessage");
const currMessage = document.getElementById("currentMessage");

function createMessage(user, message) {
    const messageElement = document.createElement("div");
    const messageText = document.createElement("p");
    messageElement.appendChild(messageText);
    messageElement.className = `flex justify-${user==="Me"? "end" : "start"}`;
    messageText.className = `bg-${user==="Me"? "green" : "red"}-50 border-${user==="Me"? "green" : "red"}-500 border-2 rounded-xl p-2 m-2`;
    messageText.innerText = `${user}: ${message}`;
    return messageElement;
}

sendMessage.addEventListener("click", () => {
    socket.emit("new-message", {
        user : "Me",
        message : currMessage.value
    });
    messages.appendChild(createMessage("Me", currMessage.value));
    currMessage.value = "";
});

socket.on("new-message", (msg) => {
    messages.appendChild(createMessage(msg.user, msg.message));
})

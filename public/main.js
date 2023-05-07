const tempData = location.search.split("=");
const userName = tempData[1].split(
    tempData[1].indexOf("+") != -1 ? "+" : "&"
)[0];
const password = tempData[2];

if (password != "1234") {
    alert("Wrong Password!!");
    location.assign(location.origin);
} else {
    document.getElementById("mainContainer").style.visibility = "visible";
}

const sendButton = document.getElementById("sendButton");
const socket = io();

socket.emit("join", userName);

socket.on("message", (input) => {
    var newMessageDiv = document.createElement("div");
    newMessageDiv.className = "messageCard active " + input.userName;

    var newUserName = document.createElement("p");
    newUserName.className = "userName";
    newUserName.innerText = input.userName;

    var newMessage = document.createElement("p");
    newMessage.className = "message";
    newMessage.innerText = input.messageSent;

    newMessageDiv.appendChild(newUserName);
    newMessageDiv.appendChild(newMessage);
    document.getElementById("messagesDiv").appendChild(newMessageDiv);
});

socket.on("updateMesssagesDisconnect", (userName) => {
    var messageCards = document.getElementsByClassName(userName);
    for (var i = 0; i < messageCards.length; i++) {
        messageCards[i].className = "messageCard inactive " + userName;
    }
});

socket.on("updateMesssagesConnect", (userName) => {
    var messageCards = document.getElementsByClassName(userName);
    for (var i = 0; i < messageCards.length; i++) {
        messageCards[i].className = "messageCard active " + userName;
    }
});

sendButton.addEventListener("click", (e) => {
    let messageSent = document.getElementById("messabeBox").value;
    socket.emit("sentMessage", { messageSent, userName });
});
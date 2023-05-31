const socket = io();

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");
let userslist = document.getElementById("users-list")

function formatDate(date) {
    const dateObject = date instanceof Date ? date : new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months in JavaScript are zero-based
    const year = dateObject.getFullYear();
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Format hours in 12-hour format (am/pm)
    const amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Format numbers to two digits
    const formattedDay = ('0' + day).slice(-2);
    const formattedMonth = ('0' + month).slice(-2);
    const formattedHours = ('0' + hours).slice(-2);
    const formattedMinutes = ('0' + minutes).slice(-2);
    const formattedSeconds = ('0' + seconds).slice(-2);

    const formattedDate = `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes} ${amPm}`;

    return formattedDate;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});
socket.on('active-users', (payload) => {
    let usersHtml = ''
    payload.forEach(element => {
        if (socket.id === element)
            return;
        usersHtml += `<li> ${element} </li>`
    })
    userslist.innerHTML = usersHtml
})
// Load chat history
socket.on("chat history", function (history) {
    history.forEach(function (message) {
        let item = document.createElement("li");
        item.textContent = `[${formatDate(message.timestamp)}]${message.user === socket.id ? 'You' : message.user}: ${message.content}`;
        messages.appendChild(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
});
socket.on("chat message", function (message) {
    let item = document.createElement("li");
    item.textContent = `[${formatDate(Date.now())}]${message.user === socket.id ? 'You' : message.user}: ${message.content}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
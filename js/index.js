"use strict";

// url =>  https://ehbchatapp.herokuapp.com/

const chat = {
    author: "RachelleVanUden",
    init() {
        document.getElementById("chatForm").addEventListener("submit", (event) => {
            event.preventDefault();
            this.sendMessage();
        })
        this.fetchMessages();
    },


    sendMessage() {
        const messageField = document.getElementById("chatInput");
        //console.log(chatInput.value);
        fetch("https://ehbchatapp.herokuapp.com/message", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: this.author,
                    message: messageField.value
                })
            })
            .then((response) => {
                console.log(res)
                this.fetchMessages()
                messageField.value = ""
            })
            .catch((event) => {
                console.error("could not send")
            })

    },

    fetchMessages() {
        fetch("https://ehbchatapp.herokuapp.com/messages")
            .then(response => response.json())
            .then(data => {
                const messageBox = document.getElementById("messageContainer");
                messageBox.innerHTML = "";
                data.sort((a, b) => a.id - b.id).forEach(message => {
                    this.renderMessage(message);
                });

            })
    },


    renderMessage(message) {
        const messageBox = document.getElementById("messageContainer");
        const mine = message.author == this.author ? "own" : null;
        const htmlString = `
        <div class="messageItem ${mine}">
          <div class="header">
              <span class="author">${message.author}</span>
              <span class="time">${new Date(message.created_at).getHours()}:${new Date(message.created_at).getMinutes()}</span>
          </div>
          <p>
              ${message.message}
          </p>
      </div>
        `;
        messageBox.insertAdjacentHTML("beforeend", htmlString)
    }

}
chat.init()
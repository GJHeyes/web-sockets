// io() is a method from the socket library added in our html file
const socket = io(),
  form = document.querySelector("#message-form"),
  input = document.querySelector("#chat"),
  messages = document.querySelector("ul");
  speechBubble = document.getElementById("bubble")

let userTyping = false;
let userSet = false;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
form.addEventListener("keydown", async function (e) {
  await delay(0)
  socket.emit("keypress", {inputLength: input.value.length, user: localStorage.getItem("user")});
});
form.addEventListener("submit", function(e){
  e.preventDefault();
})

socket.on("connection", function (user){
  if(!userSet){
    localStorage.setItem("user", user)
    userSet = true;
  }
})
socket.on("keypress", function (userInfo) {
  if (userInfo.inputLength >0 && userInfo.user !== localStorage.getItem("user")) {
    if(!userTyping){
      speechBubble.classList.remove("hidden")
    }
    userTyping = true;
  }else if(userInfo.inputLength === 0 && userInfo.user !== localStorage.getItem("user")){
    speechBubble.classList.add("hidden")
    userTyping = false
  }
});

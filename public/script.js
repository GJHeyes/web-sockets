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
/*******************pendrawing***********************/

let penDown = false

document.addEventListener('mousemove', event=>{
  if(penDown){
    const {pageX, pageY} = event
    socket.emit("pendrawing", {pageX: pageX, pageY: pageY})
  }

}) 

document.addEventListener('mousedown', ()=>{
  penDown = true
})

document.addEventListener('mouseup', ()=>{
  penDown = false
})

socket.on("pendrawing", function (penInfo){
  console.log(`PageX: ${penInfo.pageX} PageY: ${penInfo.pageY}` )
})
/*******************pendrawing***********************/
form.addEventListener("keydown", async function (e) {
  await delay(0)
  socket.emit("keydown", {inputLength: input.value.length, user: localStorage.getItem("user")});
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
socket.on("keydown", function (userInfo) {
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

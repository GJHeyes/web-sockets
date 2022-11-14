const socket = io(),
  form = document.querySelector("form"),
  input = document.querySelector("input"),
  messages = document.querySelector("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

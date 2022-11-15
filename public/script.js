// io() is a method from the socket library added in our html file
const socket = io(),
  form = document.querySelector("form"),
  input = document.querySelector("input"),
  messages = document.querySelector("ul");

// On submission of our form our anonymous callback function will run
form.addEventListener("submit", function (e) {
  // event.preventDefault() prevents the defauly action of this particular event, which is to refresh the page
  e.preventDefault();
  // Condition checking for text written in the input element
  if (input.value) {
    // Using the "emit" method to send a "chat message" event to our web server with the contents of our input tag
    socket.emit("chat message", input.value);
    // Resetting the input to empty
    input.value = "";
  }
});

// Using the "on event" method, on receipt of a chat message event from our web server it will run our callback function
socket.on("chat message", function (msg) {
  // This logic inserts the recieved message in a newly created list item node and scrolls to the most recent message
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

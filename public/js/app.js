const weatherForm = document.querySelector("form");
const formInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = formInput.value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = `${data.weather_descriptions.join(
          ", "
        )}. It is ${data.temperature} and feels like ${data.feelslike}.`;
      }
    });
  });
});

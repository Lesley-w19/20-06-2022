const button = document.querySelector(".btn");
const input = document.querySelector("input");



button.addEventListener("click", (e) => {
  e.preventDefault();
  const name = input.value;
  const paragraph = document.createElement("p");
  paragraph.innerHTML = `Hello ${name}, welcome to the bootcamp`;
  document.body.appendChild(paragraph);
  
});
 


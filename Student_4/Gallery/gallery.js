const fontSizeSelect = document.getElementById("font-size-select");
const backgroundColorOptions = document.getElementsByName("background-color");
const resetButton = document.getElementById("reset-button");

const defaultBackgroundColor = "white";

// Set the initial background color
document.body.style.backgroundColor = defaultBackgroundColor;

fontSizeSelect.addEventListener("change", () => {
  const fontSize = fontSizeSelect.value;
  document.body.style.fontSize = fontSize;
});

backgroundColorOptions.forEach((option) => {
  option.addEventListener("change", () => {
    const color = option.value;
    if (color === "random") {
      const randomColor = getRandomColor();
      document.body.style.backgroundColor = randomColor;
    } else {
      document.body.style.backgroundColor = color;
    }
  });
});

resetButton.addEventListener("click", () => {
  document.body.style.backgroundColor = defaultBackgroundColor;
  backgroundColorOptions.forEach((option) => {
    option.checked = false;
  });
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

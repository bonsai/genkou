const source = document.querySelector("#source");
const grid = document.querySelector("#grid");
const count = document.querySelector("#count");

function normalize(text) {
  return [...text.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n")].slice(0, 400);
}

function render(text) {
  const chars = normalize(text);
  grid.innerHTML = "";
  for (let i = 0; i < 400; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (chars[i] === "\\n") {
      cell.classList.add("br");
    } else if (chars[i]) {
      cell.textContent = chars[i];
    }
    grid.appendChild(cell);
  }
  count.textContent = chars.length;
}

source.addEventListener("input", () => render(source.value));

document.querySelector("#clear").addEventListener("click", () => {
  source.value = "";
  render("");
  source.focus();
});

document.querySelector("#copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(source.value);
});

render("");

const grid = document.querySelector("#grid");
const STORAGE_KEY = "genkou.text";

function normalize(text) {
  return [...String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")].slice(0, 400);
}

function render(text) {
  if (!grid) return;
  const chars = normalize(text);
  grid.innerHTML = "";
  for (let i = 0; i < 400; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (chars[i] && chars[i] !== "\n") cell.textContent = chars[i];
    grid.appendChild(cell);
  }
}

function loadText() {
  const params = new URLSearchParams(location.search);
  return params.get("text") || localStorage.getItem(STORAGE_KEY) || "";
}

render(loadText());

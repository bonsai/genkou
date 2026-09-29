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


/*
 * HTMX generation response:
 * The API may return JSON. Do not let JSON enter the DOM.
 * app.js extracts the generated text, trims it to exactly 400 characters
 * (when longer), then renders it into the 20 x 20 manuscript grid.
 */
document.body.addEventListener("htmx:afterRequest", (event) => {
  const xhr = event.detail?.xhr;
  const trigger = event.detail?.elt;
  if (!xhr || !trigger || trigger.getAttribute("hx-post") !== "/generate") return;
  if (xhr.status < 200 || xhr.status >= 300) return;

  let payload;
  try {
    payload = JSON.parse(xhr.responseText);
  } catch {
    payload = xhr.responseText;
  }

  const generated = extractText(payload);
  if (!generated) return;

  const text = normalize(generated).join("");
  source.value = text;
  render(text);
  const generatedBox = document.querySelector("#generated");
  if (generatedBox) generatedBox.textContent = "生成結果を400字原稿用紙へ配置しました。";
});

function extractText(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const preferred = ["text", "content", "output", "answer", "generated", "result"];
  for (const key of preferred) {
    if (typeof value[key] === "string") return value[key];
  }

  for (const key of preferred) {
    if (value[key] && typeof value[key] === "object") {
      const found = extractText(value[key]);
      if (found) return found;
    }
  }

  return "";
}

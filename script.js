const textInput = document.getElementById("text-input");
const charCountSpan = document.getElementById("char-count");

textInput.addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
    e.preventDefault();
  }
});
textInput.addEventListener("input", function(e) {
  e.preventDefault();
  charCountSpan.innerText = this.value.length;
});


const copyButton = document.getElementById("copy-button");
copyButton.style.display = "none";
copyButton.addEventListener("click", function() {
  const url = output.innerText;
  navigator.clipboard.writeText(url).then(function() {
    alert("Copied to clipboard!");
  });
});

const generateButton = document.getElementById("generate-button");
const output = document.getElementById("generated-link");

generateButton.addEventListener("click", function() {
  const text = textInput.value;
  if (text.length === 0) {
    return;
  }

  let compressed = LZString.compressToBase64(text);
  compressed = encodeURIComponent(compressed);
  const url = `${window.location.origin}${window.location.pathname}?c=${compressed}`;
  output.innerText = url;
  window.history.pushState({}, "", url);

  copyButton.style.display = "inline-block";
});

const urlParams = new URLSearchParams(window.location.search);
let compressed = urlParams.get("c");
if (compressed) {
  compressed = decodeURIComponent(compressed);
  const text = LZString.decompressFromBase64(compressed);
  textInput.value = text;
  charCountSpan.innerText = text.length;
}

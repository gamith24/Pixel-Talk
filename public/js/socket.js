const socket = io("http://localhost:3000");
const colorpicker = document.getElementById("color-picker");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const colorpicker_by_user = document.querySelector(".color-picker-user");
let drawing = false;
let BrushColor = "black";
const colorPlates = ["red", "blue", "green", "yellow", "black"];
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  socket.emit("start", { x: e.offsetX, y: e.offsetY });
});
canvas.addEventListener("mouseleave", () => (drawing = false));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const pos = { x: e.offsetX, y: e.offsetY, color: BrushColor };

  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = BrushColor;
  ctx.stroke();

  // apne drawing point dusre users ko bhejo
  socket.emit("draw", pos);
});

// dusre users ki drawing receive karo
socket.on("draw", (pos) => {
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = pos.color;
  ctx.stroke();
});
socket.on("start", (pos) => {
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});
socket.on("cleared", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
async function clearBoard() {
  socket.emit("clear");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
colorPlateGenerate();
function colorPlateGenerate() {
  colorpicker.innerHTML = "";

  colorPlates.forEach((value, index) => {
    let div = document.createElement("div");
    div.style.backgroundColor = `${value}`;
    div.style.border = "2px solid white";
    div.addEventListener("click", (e) => {
      colorPlates.forEach((value, index) => {
        colorpicker.getElementsByTagName("div")[index].style.border =
          "2px solid white";
      });
      e.target.style.border = "2px solid black";
      BrushColor = e.target.style.backgroundColor;
    });
    colorpicker.appendChild(div);
    if (colorPlates.length - 1 == index) {
      div.click();
    }
  });
}

function addColor() {
  const color = colorpicker_by_user.value;
  colorPlates.push(color);
  colorPlateGenerate();
}

const sendBtn = document.getElementById("btn");
const message = document.getElementById("msg");
const renderBox = document.getElementById("msg-area");
sendBtn.addEventListener("click", () => {
  const msg = message.value.trim();
  if (!msg) return;
  const msgBox = document.createElement("div");
  msgBox.innerHTML = `
    <div class="msg-div self">
      <div class="user-msg">
      ${msg}
      </div>
    </div>
  `;
  renderBox.appendChild(msgBox);
  socket.emit("chat-message", msg);
  message.value = "";
});

window.addEventListener("keydown", (e) => {
  if (e.code == "Enter") sendBtn.click();
});
socket.on("chat-message", (msg) => {
  const msgBox = document.createElement("div");
  msgBox.innerHTML = `
    <div class="msg-div self sender">
      <div class="user-msg">
      ${msg}
      </div>
    </div>
  `;
  renderBox.appendChild(msgBox);
});
colorPlateGenerate();
function colorPlateGenerate() {
  colorpicker.innerHTML = "";

  colorPlates.forEach((value, index) => {
    let div = document.createElement("div");
    div.style.backgroundColor = `${value}`;
    div.style.border = "2px solid white";
    div.addEventListener("click", (e) => {
      colorPlates.forEach((value, index) => {
        colorpicker.getElementsByTagName("div")[index].style.border =
          "2px solid white";
      });
      e.target.style.border = "2px solid black";
      BrushColor = e.target.style.backgroundColor;
    });
    colorpicker.appendChild(div);
    if (colorPlates.length - 1 == index) {
      div.click();
    }
  });
}

function addColor() {
  const color = colorpicker_by_user.value;
  colorPlates.push(color);
  colorPlateGenerate();
}

const { ipcRenderer } = require("electron");

function navigate(route) {
  ipcRenderer.send("navigate", route);
}

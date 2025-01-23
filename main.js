const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the default page
  mainWindow.loadFile("./src/app.html");

  // Handle route changes
  ipcMain.on("navigate", (event, route) => {
    if (route === "/auth/login") {
      mainWindow.loadFile(path.join(__dirname, "/src/pages/auth/login.html"));
    } else if (route === "/dashboard/add-account") {
      mainWindow.loadFile(
        path.join(__dirname, "/src/pages/dashboard/add-account.html")
      );
    } else if (route === "/dashboard/settings") {
      mainWindow.loadFile(
        path.join(__dirname, "/src/pages/dashboard/settings.html")
      );
    } else {
      mainWindow.loadFile(path.join(__dirname, "./src/app.html"));
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

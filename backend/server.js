import app from "./app.js";
import cloudinary from "cloudinary";
import axios from "axios";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});

// --- Render keep-alive ping (only in production) ---
const RENDER_URL = process.env.RENDER_KEEPALIVE_URL;
const RENDER_INTERVAL = 1000 * 60 * 14; // 14 minutes

if (process.env.NODE_ENV === "production" && RENDER_URL) {
  function pingRenderApp() {
    const time = new Date().toLocaleString();
    axios.get(RENDER_URL)
      .then((res) => {
        console.log(`[${time}] ✅ Render app is awake. Status: ${res.status}`);
      })
      .catch((err) => {
        console.error(`[${time}] ❌ Error pinging Render app: ${err.message}`);
      });
  }

  pingRenderApp();
  setInterval(pingRenderApp, RENDER_INTERVAL);
}

// lightweight logger: logs to console and optionally sends to server
import axios from "axios";

const sendToServer = async (level, message, extra = {}) => {
  try {
    // Only send in production/dev as you want — here always send
    await axios.post("http://localhost:8080/api/logs", {
      level,
      message,
      extra: JSON.stringify(extra),
      path: window.location.pathname,
    });
  } catch (err) {
    // swallow any error to avoid infinite loops
    console.debug("logger: failed to send log", err);
  }
};

const info = (msg, extra) => {
  console.info(msg, extra || "");
  sendToServer("INFO", msg, extra || {});
};

const warn = (msg, extra) => {
  console.warn(msg, extra || "");
  sendToServer("WARN", msg, extra || {});
};

const error = (msg, extra) => {
  console.error(msg, extra || "");
  sendToServer("ERROR", msg, extra || {});
};

export default {
  info,
  warn,
  error,
};


const SERVER_HOST = "localhost";
const SERVER_PORT = process.env.PORT || "8080";
const PROTOCOL = "http";

const config = {
  server: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    protocol: PROTOCOL
  }
}

export default config;
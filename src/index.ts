import ServerApplication from "./app";
import config from "./config/config";

// Start
new ServerApplication().listen(config.server.port);
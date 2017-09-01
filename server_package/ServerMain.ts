class ServerMain {
    constructor() {
        console.log("Hello from server package.");
        console.log("Network version: " + jcmp.networkVersion);
    }
}

module.exports = ServerMain;
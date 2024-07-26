// src/websocket.js
class WebSocketService {

    static instance = null;

    static getInstance() {
        if (!WebSocketService.instance)
            webSocketService.instance = new WebSocketService()
        return webSocketService.instance
    }

    constructor() {
      this.socket = null;
      this.queue = [];
      this.data;
    }
  
    connect(url) {
      if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
        this.socket = new WebSocket(url);
  
        this.socket.onopen = () => {
          console.log("WebSocket connection established");
          this.queue.forEach((message) => this.socket.send(JSON.stringify(message)));
          this.queue = [];
        };
  
        this.socket.onclose = () => {
          console.log("WebSocket connection closed");
        };
  
        this.socket.onerror = (error) => {
          console.log("WebSocket error:", error);
        };
  
        this.socket.onmessage = (event) => {
          this.data = JSON.parse(event.data);
        };
      }
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        this.queue.push(message);
      }
    }
  
    close() {
      if (this.socket) {
        this.socket.close();
      }
    }

    waitForSocketConnection(callback) {
        const checkConnection = (resolve) => {
            if (this.socket && this.socket.readyState === 1) {
                console.log("Ready...");
                if (callback) callback();
                resolve();
            } else {
                console.log("Waiting...");
                setTimeout(() => checkConnection(resolve), 100); // Check every 100ms
            }
        };
    
        return new Promise((resolve) => checkConnection(resolve));
    }
     
  }
  
  // Singleton instance
  const webSocketService = new WebSocketService();
  
  export default webSocketService;
  
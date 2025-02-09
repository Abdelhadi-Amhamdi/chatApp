import { json } from "react-router-dom";

class WebSocketService {

  static instance = null;

  static getInstance() {
      if (!WebSocketService.instance)
          webSocketService.instance = new WebSocketService()
      return webSocketService.instance
  }

  constructor() {
    this.socket = null;
    this.callbacks = []
    this.queue = [];
  }

  addCallbacks(setData) {
    this.callbacks["setData"] = setData
  }


  connect(url) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN)
      this.close()
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket(url);
      
      this.socket.onopen = () => {
        console.log("WebSocket connection established");
        this.flushQueue()
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      this.socket.onerror = (error) => {
        console.log("WebSocket error:", error);
      };

      this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data)
        if (data.messages)
          this.callbacks["setData"](data.messages.reverse())
        else if (data.message) {
          this.callbacks["setData"](prev => [...prev , data.message])
        }
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

  flushQueue() {
    while (this.queue.length > 0) {
      const message = this.queue.shift();
      this.socket.send(JSON.stringify(message));
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null
    }
  }
}

const webSocketService = new WebSocketService();

export default webSocketService;
  
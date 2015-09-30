class BaseStreamableCollection extends Backbone.Collection {
  stream() {
    const that = this;
    const socket = new WebSocket(this.WSHost + this.channel);

    socket.onopen = function() {
      console.log("Socket has been opened!");
    }

    socket.onmessage = function(msg) {
      const messageJSON = JSON.parse(msg.data);
      const model = new that.model(messageJSON);

      that.add(model);
    }
  }
}

export default BaseStreamableCollection;

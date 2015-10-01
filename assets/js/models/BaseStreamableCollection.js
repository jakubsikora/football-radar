import configModel from './ConfigModel.js';

class BaseStreamableCollection extends Backbone.Collection {
  stream() {
    const host = 'ws://' + configModel.get('WS_HOST') + ':' + configModel.get('WS_PORT') + '/';
    const channel = this.channel;
    let streaming = true;

    if (!host) {
      console.log('Stream host is not specified');
      streaming = false;
    }

    if (!channel) {
      console.log('Stream channel is not specified');
      streaming = false;
    }

    if (!streaming) return;

    const that = this;
    const socket = new WebSocket(host + channel);

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

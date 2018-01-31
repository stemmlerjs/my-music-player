
import EE from 'event-emitter';

class ObservableMediaSource {
  constructor(streamUrl) {
    this.buffer = [];
    this.xhr = new XMLHttpRequest()
    this.streamUrl = streamUrl;

    // Hook up event emitter events
    this.xhr.onprogress = () => {
      this.emit('data', this.xhr.responseText);
    }
    
    this.xhr.onload = () => {
      this.emit('data', -1)
    }

    // Start request
    this.xhr.open("GET", streamUrl, true)
    this.xhr.responseType = 'arraybuffer';
    
    this.xhr.send()

  }
}

EE(ObservableMediaSource.prototype);

module.exports = ObservableMediaSource;
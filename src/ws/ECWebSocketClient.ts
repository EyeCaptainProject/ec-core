import {BehaviorSubject} from 'rxjs';

enum WSReadyState {
  CONNECTING, OPEN, CLOSING, CLOSED
}

enum MessageType {
  POSITION_CHANGE = 1
}

export class ECWebSocketClient {

  ws: WebSocket;
  private started = false;
  private connected = false;
  public message;
  public retryMS = 3000;


  constructor() {
    this.message = new BehaviorSubject({});
  }

  public start() {
    if (!this.started) {
      console.log('Trying to connect to WebSocket');
      this.started = true;
      this.ws = new WebSocket('ws://127.0.0.1:8080/');
      this.ws.onclose = this.onClose.bind(this);
      this.ws.onmessage = this.onMessage.bind(this);
      this.ws.onopen = this.onOpen.bind(this);
      this.ws.onerror = () => {};
    }
  }


  onOpen(event: Event): void {
    console.log('Opened WebSocket');
    this.connected = true;
  }

  onError() {
    this.connected = false;
  }

  retryInXSeconds(): void {
    this.started = false;
    this.connected = false;
    setTimeout(this.start.bind(this), this.retryMS);
    console.info(`No connection to WebSocket possible... Retrying in ${this.retryMS}ms`);
  }

  onClose(closeEvent: CloseEvent): void {
    this.connected = false;
    this.retryInXSeconds();
  }

  onMessage(messageEvent: MessageEvent): void {
    const payload = JSON.parse(messageEvent.data);
    if (payload.type === MessageType.POSITION_CHANGE) {
      // Transform by the position of the Browser window
      this.message.next(payload);
    }
  }

  get isConnected() {
    return this.connected;
  }


}

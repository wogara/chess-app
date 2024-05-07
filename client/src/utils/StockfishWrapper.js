class StockfishWrapper {
  static instance = null;
  stockfishWorker = null;
  isReady = null;

  constructor(messageHandler) {
    if (!StockfishWrapper.instance) {
      console.log("creating new worker");
      this.stockfishWorker = new Worker("/stockfish-nnue-16-single.js");
      this.isReady = new Promise((resolve) => {
        this.stockfishWorker.onmessage = (event) => {
          console.log("Stockfish:", event.data);
          if (messageHandler) {
            messageHandler(event.data);
          }
          if (event.data === "uciok") {
            resolve();
          }
        };
      });
      this.init();
      this.sendCommand = this.sendCommand.bind(this);
      StockfishWrapper.instance = this;
    }
    return StockfishWrapper.instance;
  }

  init() {
    this.stockfishWorker.postMessage("uci");
  }

  async sendCommand(command) {
    await this.isReady;
    this.stockfishWorker.postMessage(command);
  }
}

export default StockfishWrapper;


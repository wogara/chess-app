
  class StockfishWrapper {
    static instance = null;
    stockfishWorker = null;
    isReady = null;
    constructor() {
        if (StockfishWrapper.instance) {
            return StockfishWrapper.instance;
        }
        console.log("creating new worker");
        this.stockfishWorker = new Worker('/stockfish-nnue-16-single.js');
        this.isReady = new Promise((resolve, reject) => {
            this.stockfishWorker.onmessage = (event) => {
                console.log("Stockfish:", event.data);
                if (event.data === 'uciok') {
                    resolve();
                }
            };
        });
        this.init();
        this.sendCommand = this.sendCommand.bind(this); 
        StockfishWrapper.instance = this;
    }

    init() {
        this.stockfishWorker.postMessage("uci");
    }

    async sendCommand(command) {
        await this.isReady; // Wait for the UCI to be ready
        this.stockfishWorker.postMessage(command);
    }
}

  
export default StockfishWrapper;

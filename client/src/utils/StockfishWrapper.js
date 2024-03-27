
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
                //console.log("Stockfish:", event.data);
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
        console.log('sending command to stockfish');
        await this.isReady; // Wait for the UCI to be ready
        this.stockfishWorker.postMessage(command);
    }
}

// class StockfishWrapper {
//     static instance = null;
//     stockfishWorker = null;
  
//     constructor() {
//       if (!StockfishWrapper.instance) {
//         console.log('Initializing Stockfish worker');
//         this.init();
//         StockfishWrapper.instance = this;
//       } else {
//         console.log('Using existing Stockfish worker');
//       }
  
//       return StockfishWrapper.instance;
//     }
  
//     init() {
//       this.stockfishWorker = new Worker('../../stockfish-nnue-16-single.js');
//       this.stockfishWorker.onmessage = (event) => {
//         console.log("Stockfish:", event.data);
//       };
//       this.stockfishWorker.postMessage("uci");
//     }
  
//     sendCommand(command) {
//       if (this.stockfishWorker) {
//         this.stockfishWorker.postMessage(command);
//       }
//     }
  
//     terminate() {
//       if (this.stockfishWorker) {
//         this.stockfishWorker.terminate();
//         this.stockfishWorker = null;
//         StockfishWrapper.instance = null;
//       }
//     }
//   }
  
export default StockfishWrapper;
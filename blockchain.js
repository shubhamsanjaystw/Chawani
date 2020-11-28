const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress=this.fromAddress;
        this.toAddress=this.toAddress;
        this.amount=amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash="" ){  
        this.previousHash=previousHash;
      this.timestamp=timestamp;
      this.transactions =transactions;
      this.hash= this.calculateHash();
      this.nonce=0;
}

    calculateHash ()
    {
     return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    
    mineBlock(diffculty){
        while(this.hash.substring(0 ,diffculty) !== Array(diffculty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    console.log( 'Blocke mined: '+ this.hash);

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.diffculty= 2;
        this.pendingTransactions =[];
        this.miningReward = 100;
    }
     createGenesisBlock(){
         return new Block('01/08/2019', 'genesis Block', '0');
     }

     getLatestBlock(){
         return this.chain[this.chain.length - 1];
     }



    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.diffculty);
       
        console.log("Block Sucessfuly mined!");
        this.chain.push(block);

        this.pendingTransactions =[
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
         this.pendingTransactions.push(transaction);
     }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }


    isChainValid(){
         for(let i=1;i < this.chain.length; i++){
             const currentBlock = this.chain[i];
             const previousBlock = this.chain[i-1];

             if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
             }
                
             if(currentBlock.previousHash !== previousBlock.hash){
                return false;
             }
                            
         }
        return true;
     }
     
}
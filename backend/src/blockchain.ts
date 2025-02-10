import crypto from "crypto"

export class Block {
  hash: string
  nonce: number

  constructor(
    public timestamp: number,
    public data: any,
    public previousHash = "",
  ) {
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  calculateHash(): string {
    return crypto
      .createHash("sha256")
      .update(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
      .digest("hex")
  }

  mineBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++
      this.hash = this.calculateHash()
    }
    console.log("Block mined: " + this.hash)
  }
}

export class Blockchain {
  chain: Block[]
  difficulty: number

  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 2
  }

  createGenesisBlock(): Block {
    return new Block(Date.now(), "Genesis Block", "0")
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1]
  }

  addBlock(data: any): Block {
    const block = new Block(Date.now(), data, this.getLatestBlock().hash)
    block.mineBlock(this.difficulty)
    this.chain.push(block)
    return block
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }
}


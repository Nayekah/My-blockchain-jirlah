import express from "express"
import cors from "cors"
import { Blockchain } from "./blockchain"

const app = express()
app.use(cors())
app.use(express.json())

const blockchain = new Blockchain()

app.post("/addBlock", (req, res) => {
  const { data } = req.body
  const newBlock = blockchain.addBlock(data)
  res.json(newBlock)
})

app.get("/chain", (req, res) => {
  res.json(blockchain.chain)
})

const PORT = 8000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


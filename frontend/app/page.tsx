"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [blockData, setBlockData] = useState("")
  const [blocks, setBlocks] = useState([])

  const addBlock = async () => {
    const response = await fetch("http://localhost:3001/addBlock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: blockData }),
    })
    const newBlock = await response.json()
    setBlocks([...blocks, newBlock])
    setBlockData("")
  }

  const getChain = async () => {
    const response = await fetch("http://localhost:3001/chain")
    const chain = await response.json()
    setBlocks(chain)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Blockchain Web App</h1>
        <div className="flex space-x-4 mb-4">
          <Input
            type="text"
            value={blockData}
            onChange={(e) => setBlockData(e.target.value)}
            placeholder="Enter block data"
            className="flex-grow"
          />
          <Button onClick={addBlock}>Add Block</Button>
          <Button onClick={getChain}>Get Chain</Button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Blockchain:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{JSON.stringify(blocks, null, 2)}</pre>
        </div>
      </div>
    </main>
  )
}


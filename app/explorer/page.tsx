"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Block {
  hash: string
  previousHash: string
  timestamp: number
  data: any
  nonce: number
}

export default function Explorer() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBlocks = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3001/chain")
      const chain = await response.json()
      setBlocks(chain)
    } catch (error) {
      console.error("Error fetching blockchain:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBlocks()
  }, []) //Fixed: Added empty dependency array to useEffect

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blockchain Explorer</h1>
        <Button onClick={fetchBlocks}>Refresh Chain</Button>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-[250px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-[300px] mb-2" />
                <Skeleton className="h-4 w-[250px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={block.hash}>
              <CardHeader>
                <CardTitle>Block #{index}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Hash:</strong> {block.hash}
                </p>
                <p>
                  <strong>Previous Hash:</strong> {block.previousHash}
                </p>
                <p>
                  <strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Data:</strong> {JSON.stringify(block.data)}
                </p>
                <p>
                  <strong>Nonce:</strong> {block.nonce}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


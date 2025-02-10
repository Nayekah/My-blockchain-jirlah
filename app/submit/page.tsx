"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function SubmitTransaction() {
  const [transactionData, setTransactionData] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3001/addBlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: transactionData }),
      })
      const newBlock = await response.json()
      toast({
        title: "Transaction submitted",
        description: `New block added with hash: ${newBlock.hash}`,
      })
      setTransactionData("")
    } catch (error) {
      console.error("Error submitting transaction:", error)
      toast({
        title: "Error",
        description: "Failed to submit transaction. Please try again.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="transactionData" className="block text-sm font-medium mb-1">
            Transaction Data
          </label>
          <Textarea
            id="transactionData"
            value={transactionData}
            onChange={(e) => setTransactionData(e.target.value)}
            placeholder="Enter transaction data (e.g., JSON object)"
            required
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Transaction"}
        </Button>
      </form>
    </div>
  )
}


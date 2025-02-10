import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
      <h1 className="text-4xl font-bold mb-6">Welcome to Blockchain Explorer</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Explore the blockchain, view transactions, and submit new data to the chain.
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/explorer">Explore Blockchain</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/submit">Submit Transaction</Link>
        </Button>
      </div>
    </div>
  )
}

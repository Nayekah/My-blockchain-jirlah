import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Blockchain Explorer
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/explorer">Explorer</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/submit">Submit Transaction</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}


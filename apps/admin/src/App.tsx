import { useState } from 'react'
import { Button } from "@repo/ui";
import { SheetTrigger, SheetDescription, SheetContent, SheetClose, SheetFooter, SheetHeader, Sheet, SheetTitle } from "@repo/ui";

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Button>Click me</Button>

        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </main>

    </>
  )
}

export default App

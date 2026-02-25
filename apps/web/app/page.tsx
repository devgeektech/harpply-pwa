import Image from "next/image";
import { Button } from "@repo/ui";
import { SheetTrigger, SheetDescription, SheetContent, SheetClose, SheetFooter, SheetHeader, Sheet, SheetTitle } from "@repo/ui";

export default function Home() {
  return (
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
  );
}

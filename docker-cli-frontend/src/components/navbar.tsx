import { useState } from "react";
import { Button } from "./ui/button";
import { AddCmdDialog } from "./add-cmd-dialog";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="w-full border-b h-16 px-2">
        <nav className="w-full max-w-4xl mx-auto h-full flex items-center justify-between border-x px-2">
          <span className="text-sm font-semibold text-primary">Docker CLI</span>

          <Button size="sm" onClick={() => setOpen(true)}>
            Add New
          </Button>
        </nav>
      </header>

      <AddCmdDialog open={open} setOpen={setOpen} />
    </>
  );
};

import { useEffect, useState } from "react";
import Cover from "./components/Cover";
import PhotoReveal from "./components/PhotoReveal";
import Birthday from "./components/Birthday";
import Messages from "./components/Messages";
import Memories from "./components/Memories";
import FinalCard from "./components/FinalCard";
import MusicButton from "./components/MusicButton";
import { FloatingHearts, Grain } from "./components/decor";

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return <Cover onDone={() => setOpen(true)} />;
  }

  return (
    <div
      className="book-enter relative min-h-screen overflow-x-clip"
      style={{
        background:
          "radial-gradient(130% 60% at 50% 0%, #fbf7ee 0%, #f6f0e3 55%, #efe4cd 100%)",
      }}
    >
      {/* whole-page paper grain */}
      <Grain className="fixed z-[70]" />

      {/* ambient drifting hearts */}
      <FloatingHearts />

      <main className="relative z-10 mx-auto max-w-[500px]">
        <PhotoReveal />
        <Birthday />
        <Messages />
        <Memories />
        <FinalCard />
      </main>

      <MusicButton />
    </div>
  );
}

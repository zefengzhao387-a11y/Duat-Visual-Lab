import { HallOfMaatGate } from "@/components/scene/HallOfMaatGate";
import { Overlay } from "@/components/ui/Overlay";

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <HallOfMaatGate />
      <Overlay />
    </div>
  );
}

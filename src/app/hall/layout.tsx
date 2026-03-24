import { HallExit } from "@/components/layout/HallExit";

export default function HallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <HallExit />
    </>
  );
}

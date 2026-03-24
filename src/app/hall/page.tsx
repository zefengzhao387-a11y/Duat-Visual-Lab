import type { Metadata } from "next";
import { DuatExperience } from "@/components/DuatExperience";

export const metadata: Metadata = {
  title: "称量厅",
  description: "玛阿特之厅 — 交互式天平场景。",
};

export default function HallPage() {
  return <DuatExperience />;
}

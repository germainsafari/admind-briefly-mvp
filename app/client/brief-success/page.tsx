"use client"

import { BriefSuccessPage } from "@/components/client/brief-success-page"
import { useRouter } from "next/navigation"

export default function BriefSuccessRoute() {
  const router = useRouter();
  return <BriefSuccessPage onBackToDashboard={() => router.push('/client')} />;
} 
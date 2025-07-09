"use client"

import { ClientDashboardEnhanced } from "@/components/client/client-dashboard-enhanced"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "client") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status !== "authenticated" || session?.user?.role !== "client") {
    return null;
  }

  return <ClientDashboardEnhanced />;
}

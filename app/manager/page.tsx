"use client"

import { ManagerDashboardNew } from "@/components/manager/manager-dashboard-new"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "manager") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status !== "authenticated" || session?.user?.role !== "manager") {
    return null;
  }

  return <ManagerDashboardNew />;
}

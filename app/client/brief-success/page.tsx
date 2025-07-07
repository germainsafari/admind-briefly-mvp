"use client"

import { BriefSuccessPage } from "@/components/client/brief-success-page"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BriefSuccessRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/briefs/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch brief");
        return res.json();
      })
      .then((data) => {
        setBrief(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (!id) return <div className="p-8 text-red-500">Missing brief ID.</div>;
  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return <BriefSuccessPage onBackToDashboard={() => router.push('/client')} brief={brief} />;
} 
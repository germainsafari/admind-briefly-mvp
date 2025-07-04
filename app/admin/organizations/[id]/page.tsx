"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function OrganizationDetailPage({ params }) {
  const { id } = use(params);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrg() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/organizations/${id}`);
        if (!res.ok) throw new Error("Failed to fetch organization");
        const data = await res.json();
        setOrg(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrg();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!org) return <div className="p-8">Organization not found.</div>;

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">{org.name?.substring(0,3) || "ORG"}</div>
            <div>
              <div className="text-xl font-semibold">{org.name}</div>
              <div className="text-gray-500">{org.location}</div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button className="text-blue-600 flex items-center space-x-1"><span>Edit</span></button>
            <button className="text-red-600 flex items-center space-x-1"><span>Deactivate organization</span></button>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-gray-500 mb-1">Description</div>
          <div className="mb-4">{org.description || "No description provided."}</div>
          <div className="text-sm text-gray-500 mb-1">Business type</div>
          <div>{org.businessType || "N/A"}</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Clients</div>
          <button className="bg-black text-white px-4 py-2 rounded">Add new client</button>
        </div>
        <div>
          {org.clients && org.clients.length > 0 ? org.clients.map(client => (
            <div key={client.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">{client.name?.split(' ').map(n => n[0]).join('')}</div>
                <div>{client.name}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="border px-2 py-1 rounded text-xs">Deactivate</button>
                <Link href={`/admin/users/${client.id}?type=client`} passHref legacyBehavior>
                  <button as="a" className="border px-2 py-1 rounded text-xs">See profile</button>
                </Link>
              </div>
            </div>
          )) : <div className="text-gray-500">No clients found.</div>}
        </div>
      </div>
      <Link href="/admin" className="text-black flex items-center space-x-1">
        <span>&larr;</span>
        <span>Back to dashboard</span>
      </Link>
    </div>
  );
} 
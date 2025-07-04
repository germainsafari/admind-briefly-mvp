"use client"

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function fetchOrganizations() {
  return fetch("/api/organizations").then(res => res.json());
}

export default function UserProfilePage({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "manager";
  const [user, setUser] = useState(null);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  function fetchManager(id) {
    return fetch(`/api/managers/${id}`).then(res => res.json());
  }
  function fetchClient(id) {
    return fetch(`/api/clients/${id}`).then(res => res.json());
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchFn = type === "manager" ? fetchManager : fetchClient;
    Promise.all([fetchFn(id), fetchOrganizations()])
      .then(([userData, orgList]) => {
        setUser(userData);
        setOrgs(orgList);
      })
      .catch(e => setError("Failed to fetch user"))
      .finally(() => setLoading(false));
  }, [id, type]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error || !user) return <div className="p-8 text-red-600">{error || "User not found."}</div>;

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img src={user.avatar || "/placeholder-user.jpg"} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
            <div>
              <div className="text-2xl font-semibold">{user.name}</div>
              <div className="text-gray-500">{user.title || user.position}</div>
              <div className="flex items-center mt-2">
                <img src={user.organization_logo || "/placeholder-logo.png"} alt="org" className="h-6 w-6 mr-2" />
                <span>{user.organization_name || user.organization}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button className="text-blue-600 flex items-center space-x-1" onClick={() => setShowEdit(true)}><span>Edit</span></button>
            <button className="text-red-600 flex items-center space-x-1"><span>Deactivate profile</span></button>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-gray-500 mb-1">Phone number</div>
          <div className="mb-4 font-semibold">{user.phone || "N/A"}</div>
          <div className="text-sm text-gray-500 mb-1">Email address</div>
          <div className="font-semibold">{user.email}</div>
        </div>
      </div>
      <Link href="/admin" className="text-black flex items-center space-x-1">
        <span>&larr;</span>
        <span>Back to dashboard</span>
      </Link>
      {showEdit && <EditUserModal user={user} orgs={orgs} type={type} onClose={() => setShowEdit(false)} onSave={setUser} />}
    </div>
  );
}

function EditUserModal({ user, orgs, type, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    title: user.title || user.position || "",
    email: user.email,
    organization: user.organization_id || user.organization,
    avatar: user.avatar,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    // PATCH to the correct endpoint
    const endpoint = type === "manager" ? `/api/managers/${user.id}` : `/api/clients/${user.id}`;
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      onSave(updated);
      onClose();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
        <button type="button" className="absolute top-4 right-4" onClick={onClose}>×</button>
        <div className="text-2xl font-semibold mb-6">Edit member profile</div>
        <div className="flex flex-col items-center mb-6">
          <img src={form.avatar || "/placeholder-user.jpg"} alt="avatar" className="h-20 w-20 rounded-full object-cover mb-2" />
          <button type="button" className="border px-3 py-1 rounded">Update image</button>
        </div>
        <label className="block mb-2">Enter name and surname
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </label>
        <label className="block mb-2">Enter job title
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
        </label>
        <label className="block mb-2">Enter email address
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" disabled />
        </label>
        <label className="block mb-2">Choose organization from the list*
          <select name="organization" value={form.organization} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1">
            <option value="">Select</option>
            {orgs.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-2 mt-6">
          <button type="button" className="border px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
        </div>
      </form>
    </div>
  );
} 
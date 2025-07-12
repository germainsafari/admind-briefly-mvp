"use client";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import Link from "next/link";

export default function ManagerProfilePage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const [showEdit, setShowEdit] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  if (!user || user.role !== "manager") {
    return <div className="p-8 text-red-600">Access denied. Only managers can view this page.</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img src={user.avatar || "/placeholder-user.jpg"} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
            <div>
              <div className="text-2xl font-semibold">{user.name}</div>
              <div className="text-gray-500">Manager</div>
              <div className="flex items-center mt-2">
                <img src={user.organization_logo || "/placeholder-logo.png"} alt="org" className="h-6 w-6 mr-2" />
                <span>{user.organization_name || user.organizationId || user.organization || "Organization"}</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-semibold">Status: </span>
                <span className="text-green-600">Active</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button className="text-blue-600 flex items-center space-x-1" onClick={() => setShowEdit(true)}><span>Edit</span></button>
            <button className="text-red-600 flex items-center space-x-1" onClick={() => setShowDeactivateDialog(true)}><span>Deactivate profile</span></button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="text-sm text-gray-500 mb-1">Email address</div>
          <div className="font-semibold">{user.email}</div>
        </div>
      </div>
      <Link href="/manager" className="text-black flex items-center space-x-1">
        <span>&larr;</span>
        <span>Back to dashboard</span>
      </Link>
      {showEdit && <EditManagerModal user={user} onClose={() => setShowEdit(false)} onSave={() => setShowEdit(false)} />}
      {showDeactivateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <div className="text-xl font-semibold mb-4">
              Are you sure you want to deactivate this profile?
            </div>
            <div className="mb-6">
              This action will prevent the manager from logging in. You can reactivate the profile later if needed.
            </div>
            <div className="flex justify-end gap-2">
              <button className="border px-4 py-2 rounded" onClick={() => setShowDeactivateDialog(false)}>No</button>
              <button className="bg-red-600 text-white px-6 py-2 rounded" onClick={() => setShowDeactivateDialog(false)}>Yes, Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditManagerModal({ user, onClose, onSave }: { user: any; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    // TODO: Implement upload logic for manager avatar
    setUploading(false);
  };

  const handleAvatarButton = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Implement PATCH logic for manager profile update
    setSaving(false);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
        <button type="button" className="absolute top-4 right-4" onClick={onClose}>×</button>
        <div className="text-2xl font-semibold mb-6">Edit manager profile</div>
        <div className="flex flex-col items-center mb-6">
          <img src={form.avatar || "/placeholder-user.jpg"} alt="avatar" className="h-20 w-20 rounded-full object-cover mb-2" />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <button type="button" className="text-blue-600 text-sm mt-2" onClick={handleAvatarButton}>Update image</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Enter name and surname</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Enter email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button type="button" className="border px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
        </div>
      </form>
    </div>
  );
} 
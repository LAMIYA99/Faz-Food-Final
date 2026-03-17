"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@/providers/TanstackQueryProvider";

interface Chef {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export default function ChefsAdmin() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChef, setEditingChef] = useState<Chef | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    description: "",
  });

  const { data: chefs = [], isLoading } = useQuery({
    queryKey: ["chefs"],
    queryFn: () => api.getData("/api/chefs"),
  });

  const createMutation = useMutation({
    mutationFn: (newChef: any) => api.PostData("/api/chefs", newChef),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chefs"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.PatchData(`/api/chefs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chefs"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.DeleteData(`/api/chefs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chefs"] });
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingChef(null);
    setFormData({ name: "", role: "", image: "", description: "" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setFormData({ ...formData, image: result.url });
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChef) {
      updateMutation.mutate({ id: editingChef._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  const openEditModal = (chef: Chef) => {
    setEditingChef(chef);
    setFormData({
      name: chef.name,
      role: chef.role,
      image: chef.image,
      description: chef.description,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[25px] shadow-sm border border-[#212121]/5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#646464]" size={18} />
          <input 
            type="text" 
            placeholder="Search chefs..." 
            className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D]"
          />
        </div>
        
        <button 
          onClick={() => {
            setEditingChef(null);
            setFormData({ name: "", role: "", image: "", description: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#C33031] text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#C33031]/20"
        >
          <Plus size={18} />
          Add Chef
        </button>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-[#646464] font-bold uppercase tracking-widest animate-pulse">Loading Chefs...</p>
            </div>
          ) : chefs.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-[#646464] font-bold uppercase tracking-widest">No chefs found.</p>
            </div>
          ) : (
            chefs.map((chef: Chef, index: number) => (
            <motion.div 
              key={chef._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[35px] shadow-sm border border-[#212121]/5 group relative overflow-hidden transition-all hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-[#F7F5F0] mb-6 border-4 border-[#F7F5F0] transition-transform group-hover:scale-110">
                  <img src={chef.image || "/placeholder.png"} alt={chef.name} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-xl font-black text-[#212121] uppercase tracking-tight">{chef.name}</h3>
                <span className="px-3 py-1 bg-[#0F7A3D]/10 text-[#0F7A3D] rounded-full text-[10px] font-black uppercase tracking-widest mt-2">
                  {chef.role}
                </span>
                <p className="text-[#646464] text-sm mt-4 line-clamp-2">{chef.description}</p>
                
                <div className="flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button 
                    onClick={() => openEditModal(chef)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#212121] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#0F7A3D]"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(chef._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C33031]/10 text-[#C33031] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#C33031] hover:text-white"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#212121]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-[40px] p-10 shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[#646464] hover:text-[#212121]"><X size={24} /></button>
              <h2 className="text-3xl font-black text-[#212121] uppercase mb-8">{editingChef ? "Edit Chef" : "Add Chef"}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Chef Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D]" />
                <input type="text" placeholder="Role (e.g. Executive Chef)" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D]" />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Chef Photo</label>
                    <div className="flex items-center bg-[#F7F5F0] rounded-lg p-0.5">
                      <button type="button" onClick={() => setImageInputMode("upload")} className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${imageInputMode === "upload" ? "bg-[#212121] text-white" : "text-[#646464]"}`}>Upload</button>
                      <button type="button" onClick={() => setImageInputMode("url")} className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${imageInputMode === "url" ? "bg-[#212121] text-white" : "text-[#646464]"}`}>URL</button>
                    </div>
                  </div>
                  {imageInputMode === "upload" ? (
                    <div className="flex items-center gap-4">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1 bg-[#F7F5F0] border-none rounded-xl py-3 px-5 text-xs font-bold" />
                      {formData.image && <div className="w-12 h-12 rounded-full overflow-hidden border shrink-0"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="flex-1 bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all" placeholder="https://..." />
                      {formData.image && <div className="w-12 h-12 rounded-full overflow-hidden border shrink-0"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
                    </div>
                  )}
                  {uploading && <p className="text-[10px] font-bold text-[#0F7A3D] animate-pulse">Uploading...</p>}
                </div>

                <textarea placeholder="Description" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] resize-none" />
                <button 
                  type="submit" 
                  disabled={uploading || createMutation.isPending || updateMutation.isPending}
                  className="w-full bg-[#C33031] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#212121] transition-all disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : (createMutation.isPending || updateMutation.isPending) ? "Saving..." : editingChef ? "Update Chef" : "Save Chef"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

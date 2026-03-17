"use client";

import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  FileText,
  Calendar,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@/providers/TanstackQueryProvider";

interface Blog {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  commentsCount?: number;
}

export default function BlogsAdmin() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    image: "",
  });

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => api.getData("/api/blogs"),
  });

  const createMutation = useMutation({
    mutationFn: (newBlog: any) => api.PostData("/api/blogs", { 
      ...newBlog, 
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
      commentsCount: 0 
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.PatchData(`/api/blogs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.DeleteData(`/api/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setFormData({ title: "", category: "", excerpt: "", image: "" });
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
    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      image: blog.image,
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
            placeholder="Search blogs..." 
            className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D]"
          />
        </div>
        
        <button 
          onClick={() => {
            setEditingBlog(null);
            setFormData({ title: "", category: "", excerpt: "", image: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#FFD200] text-[#212121] px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg"
        >
          <Plus size={18} />
          Write Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
             <div className="col-span-full py-20 text-center uppercase font-black text-[#646464] animate-pulse">Loading Blogs...</div>
        ) : blogs.length === 0 ? (
             <div className="col-span-full py-20 text-center uppercase font-black text-[#646464]">No blog posts found.</div>
        ) : (
          blogs.map((blog: Blog, index: number) => (
            <motion.div 
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-[35px] shadow-sm border border-[#212121]/5 flex gap-6 group hover:shadow-xl transition-all"
            >
              <div className="w-40 h-40 rounded-[25px] overflow-hidden bg-[#F7F5F0] shrink-0">
                <img src={blog.image || "/placeholder.png"} alt={blog.title} className="object-cover w-full h-full transition-transform group-hover:scale-110" />
              </div>
              
              <div className="flex flex-col justify-between py-2 flex-1">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#C33031] mb-2">
                    <span>{blog.category}</span>
                    <span className="text-[#646464]/40">•</span>
                    <span className="text-[#646464] flex items-center gap-1"><Calendar size={10} /> {blog.date}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#212121] uppercase tracking-tight line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-[#646464] text-xs mt-2 line-clamp-2">{blog.excerpt}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#646464]">
                    <MessageSquare size={12} /> {blog.commentsCount} Comments
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(blog)} className="p-2 text-[#0F7A3D] hover:bg-[#0F7A3D]/10 rounded-lg"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-[#C33031] hover:bg-[#C33031]/10 rounded-lg"><Trash2 size={16} /></button>
                  </div>
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[40px] p-12 shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-[#646464] hover:text-[#212121]"><X size={28} /></button>
              <h2 className="text-4xl font-black text-[#212121] uppercase mb-10 tracking-tighter">{editingBlog ? "Edit Post" : "Write Post"}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Blog Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D]" placeholder="e.g. Secret Sauce Revealed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Category</label>
                    <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] appearance-none">
                      <option value="">Select</option>
                      <option value="STARTUP">Startup</option>
                      <option value="LIFE LESSONS">Life Lessons</option>
                      <option value="RECIPES">Recipes</option>
                      <option value="TIPS">Tips</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Cover Image</label>
                    <div className="flex items-center bg-[#F7F5F0] rounded-lg p-0.5">
                      <button type="button" onClick={() => setImageInputMode("upload")} className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${imageInputMode === "upload" ? "bg-[#212121] text-white" : "text-[#646464]"}`}>Upload</button>
                      <button type="button" onClick={() => setImageInputMode("url")} className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${imageInputMode === "url" ? "bg-[#212121] text-white" : "text-[#646464]"}`}>URL</button>
                    </div>
                  </div>
                  {imageInputMode === "upload" ? (
                    <div className="flex items-center gap-4">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1 bg-[#F7F5F0] border-none rounded-xl py-3 px-5 text-sm font-bold" />
                      {formData.image && <div className="w-20 h-12 rounded-xl overflow-hidden border shrink-0"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="flex-1 bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all" placeholder="https://..." />
                      {formData.image && <div className="w-20 h-12 rounded-xl overflow-hidden border shrink-0"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
                    </div>
                  )}
                  {uploading && <p className="text-[10px] font-bold text-[#0F7A3D] animate-pulse">Uploading...</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Excerpt</label>
                  <textarea rows={4} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] resize-none" placeholder="Short summary of the post..." />
                </div>
                <button 
                  type="submit" 
                  disabled={uploading || createMutation.isPending || updateMutation.isPending}
                  className="w-full bg-[#212121] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#0F7A3D] transition-all shadow-xl disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : (createMutation.isPending || updateMutation.isPending) ? "Publishing..." : editingBlog ? "Update Post" : "Publish Post"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Filter,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@/providers/TanstackQueryProvider";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description?: string;
  longDescription?: string;
  additionalInformation?: {
    weight?: string;
    size?: string;
    serves?: string;
  };
}

export default function ProductsAdmin() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    longDescription: "",
    additionalInformation: {
      weight: "",
      size: "",
      serves: "",
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.getData("/api/products"),
  });

  const createMutation = useMutation({
    mutationFn: (newProduct: any) => api.PostData("/api/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.PatchData(`/api/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.DeleteData(`/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      longDescription: "",
      additionalInformation: { weight: "", size: "", serves: "" }
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      description: product.description || "",
      longDescription: product.longDescription || "",
      additionalInformation: {
        weight: product.additionalInformation?.weight || "",
        size: product.additionalInformation?.size || "",
        serves: product.additionalInformation?.serves || "",
      },
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
            placeholder="Search products..."
            className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-[#F7F5F0] rounded-xl text-[#212121] hover:bg-[#212121] hover:text-white transition-all">
            <Filter size={18} />
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                name: "",
                price: "",
                category: "",
                image: "",
                description: "",
                longDescription: "",
                additionalInformation: { weight: "", size: "", serves: "" }
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#0F7A3D] text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#0F7A3D]/20"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>
      <div className="bg-white rounded-[30px] shadow-sm border border-[#212121]/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#212121] text-white">
            <tr>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Product</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Category</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Price</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F7F5F0]">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-[#646464] font-bold uppercase tracking-widest text-sm animate-pulse">
                  Loading Products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-[#646464] font-bold uppercase tracking-widest text-sm">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product: Product, index: number) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-[#F7F5F0]/50 transition-colors group"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F7F5F0] relative">
                        <img src={product.image || "/placeholder.png"} alt={product.name} className="object-cover w-full h-full" />
                      </div>
                      <span className="font-extrabold text-[#212121] uppercase text-sm tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-[#C33031]/10 text-[#C33031] rounded-full text-[10px] font-black uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-black text-[#212121] text-sm tracking-tight">
                    ${product.price}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-[#0F7A3D] hover:bg-[#0F7A3D]/10 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-[#C33031] hover:bg-[#C33031]/10 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#212121]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#646464] hover:text-[#212121] transition-all"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-black text-[#212121] uppercase tracking-tighter">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <p className="text-[#646464] text-xs uppercase font-bold tracking-widest mt-1">
                  Fill in the details below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all"
                    placeholder="e.g. Double Beef Burger"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all"
                      placeholder="9.99"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Category</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="BURGER">Burgers</option>
                      <option value="PIZZA">Pizza</option>
                      <option value="HOT DRINK">Hot Drinks</option>
                      <option value="BURRITO">Burrito</option>
                      <option value="FRIES">Fries</option>
                      <option value="SALADS">Salads</option>
                      <option value="SANDWICH">Sandwich</option>
                      <option value="SUSHI">Sushi</option>
                      <option value="TACOS">Tacos</option>
                      <option value="PASTA">Pasta</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Image</label>
                    <div className="flex items-center bg-[#F7F5F0] rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => setImageInputMode("upload")}
                        className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${imageInputMode === "upload" ? "bg-[#212121] text-white" : "text-[#646464]"}`}
                      >Upload</button>
                      <button
                        type="button"
                        onClick={() => setImageInputMode("url")}
                        className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${imageInputMode === "url" ? "bg-[#212121] text-white" : "text-[#646464]"}`}
                      >URL</button>
                    </div>
                  </div>
                  {imageInputMode === "upload" ? (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 px-5 text-xs font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#212121] file:text-white hover:file:bg-[#0F7A3D]"
                        />
                      </div>
                      {formData.image && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border shrink-0">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="flex-1 bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all"
                        placeholder="https://..."
                      />
                      {formData.image && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border shrink-0">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                  {uploading && <p className="text-[10px] font-bold text-[#0F7A3D] animate-pulse">Uploading to Cloudinary...</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Short Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all resize-none"
                    placeholder="Short description (shown in cards)..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Long Description</label>
                  <textarea
                    rows={4}
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    className="w-full bg-[#F7F5F0] border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all resize-none"
                    placeholder="Detailed product description, ingredients, story..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#212121]">Additional Information</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#646464]">Weight</p>
                      <select
                        value={formData.additionalInformation.weight}
                        onChange={(e) => setFormData({ ...formData, additionalInformation: { ...formData.additionalInformation, weight: e.target.value } })}
                        className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 px-4 text-xs font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="100g">100g</option>
                        <option value="150g">150g</option>
                        <option value="200g">200g</option>
                        <option value="250g">250g</option>
                        <option value="300g">300g</option>
                        <option value="400g">400g</option>
                        <option value="500g">500g</option>
                        <option value="1kg">1kg</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#646464]">Size</p>
                      <select
                        value={formData.additionalInformation.size}
                        onChange={(e) => setFormData({ ...formData, additionalInformation: { ...formData.additionalInformation, size: e.target.value } })}
                        className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 px-4 text-xs font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="XS">XS</option>
                        <option value="S">S — Small</option>
                        <option value="M">M — Medium</option>
                        <option value="L">L — Large</option>
                        <option value="XL">XL — Extra Large</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#646464]">Serves</p>
                      <select
                        value={formData.additionalInformation.serves}
                        onChange={(e) => setFormData({ ...formData, additionalInformation: { ...formData.additionalInformation, serves: e.target.value } })}
                        className="w-full bg-[#F7F5F0] border-none rounded-xl py-3 px-4 text-xs font-bold focus:ring-2 focus:ring-[#0F7A3D] transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3-4">3-4 People</option>
                        <option value="5-6">5-6 People</option>
                        <option value="6+">6+ People</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uploading || createMutation.isPending || updateMutation.isPending}
                  className="w-full bg-[#212121] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#0F7A3D] transition-all shadow-xl active:scale-[0.98] disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : (createMutation.isPending || updateMutation.isPending) ? "Saving..." : editingProduct ? "Update Product" : "Save Product"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

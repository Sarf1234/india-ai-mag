"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PostForm from "@/components/ui/admin/PostForm";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [internalLinks, setInternalLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);

  // 🔹 Load post data
  useEffect(() => {
    let mounted = true;

    async function loadPost() {
      try {
        const res = await apiRequest(`/api/posts/${id}`, "GET");
        const data = res.data || res.post || res;
        if (!mounted) return;
        setPost(data);
      } catch (err) {
        toast.error("Failed to load post");
      }
    }

    if (id) loadPost();
    return () => (mounted = false);
  }, [id]);

  // 🔹 Load internal links (same as create page)
  useEffect(() => {
    let active = true;

    async function fetchInternalLinks() {
      try {
        const res = await apiRequest("/api/posts/internal-links", "GET");
        if (active) {
          setInternalLinks(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load internal links", err);
        toast.error("Failed to load internal links");
      } finally {
        if (active) setLoadingLinks(false);
      }
    }

    fetchInternalLinks();
    return () => {
      active = false;
    };
  }, []);

  async function handleUpdate(payload) {
    try {
      await apiRequest(`/api/posts/${id}`, "PUT", payload);
      toast.success("Post updated");
      router.push("/admin/posts");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  }

  if (!post) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-rose-600 mb-4">
        Edit Post
      </h2>

      <PostForm
        initialData={post}
        onSubmit={handleUpdate}
        internalLinks={internalLinks}   // ✅ NEW
        loadingLinks={loadingLinks}     // ✅ NEW
        mode="edit"                     // optional, future-proof
      />
    </div>
  );
}

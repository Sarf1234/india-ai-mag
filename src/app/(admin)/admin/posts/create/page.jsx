"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import PostForm from "@/components/ui/admin/PostForm";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreatePostPage() {
  const router = useRouter();
  const [internalLinks, setInternalLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);

  // 🔹 Fetch available internal links once
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

  async function handleCreate(data) {
    try {
      await apiRequest("/api/posts", "POST", data);
      toast.success("Post created");
      router.push("/admin/posts");
    } catch (err) {
      toast.error(err.message || "Create failed");
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-rose-600 mb-4">
        Create Post
      </h2>

      <PostForm
        onSubmit={handleCreate}
        internalLinks={internalLinks}     // ✅ NEW
        loadingLinks={loadingLinks}       // ✅ NEW
        mode="create"                     // optional but recommended
      />
    </div>
  );
}

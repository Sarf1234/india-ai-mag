"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await apiRequest("/api/posts?page=1&limit=50");
        const data = res.data || res.posts || res;
        if (!mounted) return;
        setPosts(data || []);
      } catch (err) {
        toast.error("Failed to load posts");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await apiRequest(`/api/posts/${id}`, "DELETE");
      setPosts((p) => p.filter((x) => x._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-rose-600">
            Posts
          </h1>
          <p className="text-sm text-gray-500">
            Manage, edit and organize your blog posts
          </p>
        </div>

        <Link href="/admin/posts/create">
          <Button className="bg-rose-600 hover:bg-rose-700">
            + Create Post
          </Button>
        </Link>
      </div>

      {/* Content */}
      {loading && (
        <div className="text-gray-500 text-sm">Loading posts…</div>
      )}

      {!loading && posts.length === 0 && (
        <div className="border border-dashed rounded-lg p-10 text-center bg-rose-50">
          <div className="text-lg font-medium text-rose-600">
            No posts yet
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Start by creating your first blog post
          </p>
          <Link href="/admin/posts/create">
            <Button className="mt-4 bg-rose-600 hover:bg-rose-700">
              Create First Post
            </Button>
          </Link>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="group border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-800 group-hover:text-rose-600 transition">
                      {post.title}
                    </h3>

                    {post.isFeatured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        Featured
                      </span>
                    )}

                    {!post.published && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        Draft
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {post.excerpt || post.metaDescription || "No description"}
                  </p>

                  <div className="text-xs text-gray-400 mt-2">
                    Slug: <span className="font-mono">{post.slug}</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/posts/${post._id}/edit`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:border-rose-600 hover:text-rose-600"
                    >
                      Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

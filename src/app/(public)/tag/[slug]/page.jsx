import Link from "next/link";
import Image from "next/image";
import { apiRequest } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function TagPage({ params }) {
  const { slug } = await params;
  let posts = [];
  let tag = null;

  try {
    const res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/tags/${slug}`);
    tag = res.data
    posts = res.data
  } catch (err) {
    console.error("Failed to fetch tag posts:", err);
  }

  if (!tag) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Tag not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20">
      <h1 className="text-4xl font-extrabold text-pink-500 text-center mb-6">
        #{tag.name}
      </h1>
      <p className="text-center text-gray-700 mb-12">{tag.description}</p>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found for this tag.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-300 transition-all duration-300"
              prefetch={true}
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.coverImage || "/placeholder.png"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((t) => (
                    <span
                      key={t._id}
                      className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-medium"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-pink-500 transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-gray-600 mt-3 text-sm line-clamp-3">{post.excerpt}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime || 3} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

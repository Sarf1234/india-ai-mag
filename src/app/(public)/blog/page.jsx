import Link from "next/link";
import Image from "next/image";
import { apiRequest } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AllPostsPage({ searchParams }) {
  let posts = [];
  let total = 0;

  try {
    const res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);

   console.clear()
   console.log(res)
    posts = res.data;
    total = res.total;
  } catch (err) {
    console.error("SSR posts fetch failed:", err);
  }

  return (
    <div className="bg-rose-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center sm:text-left">
        Latest Stories
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No posts found.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-3xl bg-gradient-to-tr from-rose-50 to-purple-50 shadow-sm border border-rose-100 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              prefetch={true}
            >
              {/* Cover Image */}
              <div className="relative w-full h-64">
                <Image
                  src={post.coverImage || "/placeholder.png"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories?.map((cat) => (
                    <span
                      key={cat._id}
                      className="text-xs px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-medium"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-rose-500 transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex justify-between items-center mt-5 text-xs text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>{post.readTime || 3} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

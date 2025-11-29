import Image from "next/image"
import { apiRequest } from "@/lib/api"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function SinglePostPage({ params }) {
  const { slug } = await params

  console.clear()
  console.log(slug)

  let post = null

  try {
    const res = await apiRequest(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/slug/${slug}`
    )
    post = res.data
  } catch (err) {
    console.error("Failed to fetch post:", err)
  }

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto py-32 text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50 pb-20">

      {/* HEADER COVER */}
      <section className="relative w-full h-[55vh] overflow-hidden rounded-b-3xl shadow-lg">
        <Image
          src={post.coverImage || "/placeholder.png"}
          alt={post.title}
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-6 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
            {post.title}
          </h1>
          <p className="text-rose-100 mt-3 text-sm">
            {new Date(post.createdAt).toLocaleDateString()} • {post.readTime || 3} min read
          </p>
        </div>
      </section>

      {/* BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 -mt-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 border border-pink-100">

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.categories?.map((cat) => (
              <span
                key={cat._id}
                className="text-xs px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-medium"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-700 italic border-l-4 border-rose-300 pl-4 mb-8">
              {post.excerpt}
            </p>
          )}

          {/* CONTENT */}
          <div
            className="prose prose-lg max-w-none prose-p:text-gray-800 prose-headings:text-gray-900 prose-a:text-rose-600 prose-a:underline prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* TAGS */}
          {post.tags?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/tag/${tag.slug}`}
                    className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* CTA / NEXT READ */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </article>
  )
}

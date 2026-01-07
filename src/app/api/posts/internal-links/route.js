import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();

    /**
     * ⚡ PERFORMANCE-FIRST QUERY
     * - published posts only
     * - select minimal fields
     * - lean() for plain JS objects
     * - sort by latest (optional UX improvement)
     */
    const posts = await Post.find(
      { published: true },
      { title: 1, slug: 1 }
    )
      .sort({ createdAt: -1 })
      .lean();

    // Map to frontend-friendly structure
    const links = posts.map((post) => ({
      title: post.title,
      url: `/blog/${post.slug}`,
    }));

    return new Response(
      JSON.stringify({ success: true, data: links }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/posts/internal-links error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch internal links" }),
      { status: 500 }
    );
  }
}

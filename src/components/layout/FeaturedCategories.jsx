import Link from "next/link";
import Image from "next/image";
import { apiRequest } from "@/lib/api";

// Map images to tags by slug
const tagImages = {
  love: "https://thumbs.dreamstime.com/b/romantic-valentine-couple-under-blossom-flowers-trees-love-watercolour-painting-illustration-361917816.jpg", // Replace with your images
  romance: "https://thumbs.dreamstime.com/b/romantic-valentine-couple-under-blossom-flowers-trees-love-watercolour-painting-illustration-361917816.jpg", // Replace with your images
  relationship: "https://thumbs.dreamstime.com/b/romantic-valentine-couple-under-blossom-flowers-trees-love-watercolour-painting-illustration-361917816.jpg", // Replace with your images
  breakup: "https://thumbs.dreamstime.com/b/romantic-valentine-couple-under-blossom-flowers-trees-love-watercolour-painting-illustration-361917816.jpg", // Replace with your images
}

export const dynamic = "force-dynamic"; // Optional: ensures always fresh

export default async function TagsSection() {
  let tags = [];

  try {
    const res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`);
    tags = res.data || [];
  } catch (err) {
    console.error("Failed to fetch tags:", err);
  }

  if (!tags.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Explore Tags
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tags.map((tag) => (
            <Link
              key={tag._id}
              href={`/tag/${tag.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={"https://res.cloudinary.com/dsc5aznps/image/upload/v1764423345/posts/b4h68sz4bxoy5g9tcecl.png" || "/placeholder.png"}
                  alt={tag.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">{tag.name}</h3>
                <p className="text-gray-200 text-sm mt-1">
                  {tag.description || "Explore posts with this tag."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

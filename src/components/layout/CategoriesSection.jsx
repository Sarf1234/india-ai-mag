// components/CategoriesSection.js
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export const dynamic = "force-dynamic"; // SSR

export default async function CategoriesSection() {
  let categories = [];

  try {
    const res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
    categories = res.data || [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  if (!categories.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Explore Categories
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/category/${cat.slug}`}
            className="block rounded-lg px-4 py-3 bg-rose-50 text-rose-600 font-semibold text-center hover:bg-rose-100 hover:scale-105 transition-transform duration-200 shadow-sm"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

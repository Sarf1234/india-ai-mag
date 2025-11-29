import { connectDB } from "../../../lib/db";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import { categoriesSeed, tagsSeed } from "@/utils/seedData"; // <-- make sure path is correct

export async function GET() {
  try {
    await connectDB();

    // Reset Collections
    await Category.deleteMany({});
    await Tag.deleteMany({});

    // Insert New Categories (with title, description, keywords)
    await Category.insertMany(
      categoriesSeed.map((c) => ({
        name: c.name,
        slug: c.slug,
        title: c.title,
        description: c.description,
        keywords: c.keywords,
      }))
    );

    // Insert New Tags (with title / desc / keywords OPTIONAL)
    await Tag.insertMany(
      tagsSeed.map((t) => ({
        name: t.name,
        slug: t.slug,
        title: t.title || `${t.name} – Explore Related Posts`,
        description: t.description || `Posts related to ${t.name}`,
        keywords: t.keywords || [t.name],
      }))
    );

    return Response.json({
      success: true,
      message: "Database seeded successfully with updated categories & tags",
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}

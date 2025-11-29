import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import { categoriesSeed, tagsSeed } from "./seedData";

export async function seedDatabase() {
  await connectDB();

  // Insert categories if none exist
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    await Category.insertMany(categoriesSeed);
  }

  // Insert tags if none exist
  const tagCount = await Tag.countDocuments();
  if (tagCount === 0) {
    await Tag.insertMany(tagsSeed);
  }

  return "Seed data inserted successfully.";
}

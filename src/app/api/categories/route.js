import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 });

  return Response.json({
    success: true,
    data: categories,
  });
}

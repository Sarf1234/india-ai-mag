import { connectDB } from "@/lib/db";
import Tag from "@/models/Tag";

export async function GET() {
  await connectDB();
  const tags = await Tag.find().sort({ name: 1 });

  return Response.json({
    success: true,
    data: tags,
  });
}

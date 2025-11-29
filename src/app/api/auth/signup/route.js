import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, username, password } = body;

    if (!name || !email || !username || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if exists
    const exist = await User.findOne({ email });
    if (exist) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      username,
      password: hashed,
    });

    return Response.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

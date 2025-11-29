import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword } from "@/lib/bcrypt";
import { createToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = createToken({ id: user._id, role: user.role });

    // Create response
    const res = NextResponse.json({ message: "Login successful" });

    // Set cookie here
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

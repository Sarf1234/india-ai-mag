import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import User from "@/models/User";
import { connectDB } from "./db";

export async function getAuthUser() {
  await connectDB();

  // Get all cookies
  const cookieStore = await cookies(); 

  // cookies().get() is replaced by this:
  const tokenCookie = cookieStore.get ? cookieStore.get("token") : cookieStore.get("token") || cookieStore["token"];
  // OR simpler:
  const token = cookieStore.get?.("token")?.value || cookieStore["token"]?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await User.findById(decoded.id).select("-password");
  return user;
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdmin() {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") throw new Error("Admin only route");
  return user;
}

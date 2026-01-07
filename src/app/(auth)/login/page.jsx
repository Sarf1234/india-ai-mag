"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.message || "Login failed");
      return;
    }

    toast.success("Logged in successfully");
    router.push("/admin/posts");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg border border-pink-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-pink-600">
            Admin Login
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Secure access to your dashboard
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="border-pink-300 focus-visible:ring-pink-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="border-pink-300 focus-visible:ring-pink-400"
                required
              />
            </div>

            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Signup failed");
      return;
    }

    toast.success("Account created successfully");
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-rose-50 to-white">

      <Card className="w-full max-w-md border border-rose-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-rose-600">
            Create Your Account ❤️
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">

            <Input
              name="name"
              placeholder="Full Name"
              className="bg-rose-50 border-rose-200"
              required
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              className="bg-rose-50 border-rose-200"
              required
            />

            <Input
              name="username"
              placeholder="Username"
              className="bg-rose-50 border-rose-200"
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-rose-50 border-rose-200"
              required
            />

            <Button
              className="w-full bg-rose-600 hover:bg-rose-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { User } from "@/types/types";

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        setUser(response.data);
        console.log(response.data);

        setUsername(response.data.user.username || "");
        setEmail(response.data.user.email || "");

      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put("/auth/profile",
        { username, email, password },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Profile updated!");
      if (password) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
<div className="w-full flex flex-col items-center min-h-[calc(100vh-5rem)] justify-center">
  <h1 className="text-4xl mb-8">My Profile</h1>
      <Tabs className="w-full max-w-lg" defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Update your profile information.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-8">

              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="flex gap-3">
              <Button onClick={handleUpdate}>Save changes</Button>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label>New password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={handleUpdate}>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page
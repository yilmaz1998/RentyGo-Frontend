"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React, { useState } from "react"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/login", {
        username, password
      })
      console.log("Login successful:", response.data)
      localStorage.setItem("token", response.data.token);
      router.push("/profile");

    } catch (error) {
      console.error("Login failed:", error)
      setUsername("")
      setPassword("")
    }
}
    
  return (
    <div className="w-full flex items-center min-h-[calc(100vh-5rem)] justify-center px-6">
    <Card className="w-full max-w-lg">
      <CardHeader className="gap-4">
        <CardTitle className="text-2xl">RentGo</CardTitle>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
        Enter your information below to log in to your account
        </CardDescription>
        <CardAction>
        <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-8">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
              id="password" 
              type="password"
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleLogin} className="w-full mt-2">
          Login
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default page
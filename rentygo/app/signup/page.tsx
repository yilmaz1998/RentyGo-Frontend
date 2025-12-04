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
  const [email, setEmail] = useState("")
  const router = useRouter();


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username, email, password
      })
      console.log("Signup successful:", response.data)
      localStorage.setItem("token", response.data.token);
      router.push("/login");

    } catch (error) {
      console.error("Signup failed:", error)
      setUsername("")
      setPassword("")
    }
}
    
  return (
    <div className="w-full flex items-center min-h-[calc(100vh-5rem)] justify-center px-6">
    <Card className="w-full max-w-lg">
      <CardHeader className="gap-4">
        <CardTitle className="text-2xl">RentGo</CardTitle>
        <CardTitle>Sign up for a new account</CardTitle>
        <CardDescription>
          Enter your information below to sign up to RentGo.
        </CardDescription>
        <CardAction>
        <Link href="/login" className="underline">
            Login Page
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
                <Label htmlFor="email">Email</Label>
              </div>
              <Input 
              id="email" 
              type="email"
              placeholder="example@gmail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
        <Button onClick={handleSignup} className="w-full mt-2">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default page
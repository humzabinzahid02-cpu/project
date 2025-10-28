"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const VALID_EMAIL = "arswift01@gmail.com"
  const VALID_PASSWORD = "AR@123456"

  // ✅ Removed redirect check (no auto-redirect)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return
      const form = formRef.current
      if (!form) return

      const target = e.target as Element | null
      const isInsideForm = !!(target && form.contains(target))

      if (!isInsideForm) {
        e.preventDefault()
        form.requestSubmit()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleLogin = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required."
    } else if (email !== VALID_EMAIL) {
      newErrors.email = "Invalid email address."
    }

    if (!password) {
      newErrors.password = "Password is required."
    } else if (password !== VALID_PASSWORD) {
      newErrors.password = "Invalid password."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // ✅ Save login state before redirect
      localStorage.setItem("isAuthenticated", "true")
      router.push("/dashboard")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100vh" }}>
      {/* Left Image (hidden on mobile) */}
      <Box
        sx={{
          flex: { xs: "none", md: 1.2 },
          height: { xs: 0, md: "100vh" },
          position: "relative",
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src="/royal-water.png"
          alt="Royal Water"
          fill
          style={{ objectFit: "cover", objectPosition: "70% center" }}
        />
      </Box>

      {/* Right Login Section */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4, md: 8 },
          bgcolor: "#fff",
          minHeight: { xs: "100vh", md: "auto" },
        }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            width: { xs: "100%", sm: "320px", md: "370px" },
            maxWidth: "400px",
            textAlign: "center",
            bgcolor: "#E5F0FE",
            borderRadius: "30px",
            border: "1px solid #D1E5F7",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "#333",
              mb: 1,
              mt: 1.5,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Sign in
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 1, fontSize: { xs: "0.875rem", sm: "0.840rem" } }}>
            Welcome back! Please login to your account.
          </Typography>

          <form onSubmit={handleSubmit} ref={formRef}>
            <TextField
              fullWidth
              placeholder="Email address"
              margin="normal"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              autoFocus
              sx={{
                mb: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                  bgcolor: "#fff",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              margin="normal"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                  bgcolor: "#fff",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                py: { xs: 1, sm: 1.2 },
                borderRadius: "6px",
                bgcolor: "#4f46e5",
                textTransform: "none",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: "500",
                height: "35px",
                marginTop: "10px",
              }}
            >
              Sign In
            </Button>
          </form>
            <Typography variant="body2" sx={{ color: "#666", mt: 2, fontSize: { xs: "0.875rem", sm: "0.840rem" } }}>
            Issue with Sign in? <span className="text-[#5B63E5] underline underline-offset-3 cursor-pointer">Contact Support</span>
          </Typography>
        </Box>
      </Box>
    </Box>
    
  )
}

"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // ✅ Ab koi bhi email + password chalega
    setError("");
    router.push("/dashboard");
  };

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
            width: { xs: "100%", sm: "320px", md: "280px" },
            maxWidth: "400px",
            textAlign: "center",
            bgcolor: "#E6F0FA",
            borderRadius: "12px",
            border: "1px solid #D1E5F7",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "#333",
              mb: 0.5,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Sign in
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 3, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Welcome back! Please login to your account.
          </Typography>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            placeholder="Email address"
            margin="normal"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 1.5,
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
            onClick={handleLogin}
            sx={{
              py: { xs: 1, sm: 1.2 },
              borderRadius: "6px",
              bgcolor: "#6366f1",
              textTransform: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              fontWeight: "500",
              "&:hover": { bgcolor: "#4f46e5" },
            }}
          >
            Sign In with Email
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
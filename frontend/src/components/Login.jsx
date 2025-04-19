// src/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/library"), 1500);
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <Header />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 48px)", // adjust based on Header/Footer height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 400,
            width: "100%",
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ my: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Not a user?{" "}
            <MuiLink href="/signup" underline="hover">
              Sign up now
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Login;

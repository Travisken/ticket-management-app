// server.js
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3001

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next()
})

// Serve the static gateway UI
app.use(express.static(path.join(__dirname, "public")))

// Base target for all apps (single Vercel deployment)
const BASE_URL = "https://ticket-management-3vwo89b0a-traviskens-projects.vercel.app/"

// React app proxy
app.use(
  "/react",
  createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,
    ws: true,
    onError: (err, req, res) => {
      console.error("React proxy error:", err)
      res.status(503).json({ error: "React app unavailable" })
    },
  }),
)

// Vue app proxy
app.use(
  "/vue",
  createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,
    ws: true,
    onError: (err, req, res) => {
      console.error("Vue proxy error:", err)
      res.status(503).json({ error: "Vue app unavailable" })
    },
  }),
)

// Twig app proxy
app.use(
  "/twig",
  createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,
    ws: true,
    onError: (err, req, res) => {
      console.error("Twig proxy error:", err)
      res.status(503).json({ error: "Twig app unavailable" })
    },
  }),
)

// Root route - gateway homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Reverse Proxy Gateway running on http://localhost:${PORT}`)
  console.log(`\n📍 Available routes:`)
  console.log(`   - React app:  http://localhost:${PORT}/react`)
  console.log(`   - Vue app:    http://localhost:${PORT}/vue`)
  console.log(`   - Twig app:   http://localhost:${PORT}/twig`)
  console.log(`   - Gateway:    http://localhost:${PORT}`)
  console.log(`   - Health:     http://localhost:${PORT}/health\n`)
})

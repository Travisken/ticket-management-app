const express = require("express")
const { createProxyMiddleware } = require("express-http-proxy")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3001

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Serve static files for the gateway page
app.use(express.static(path.join(__dirname, "public")))

// React app proxy (port 3000)
app.use(
  "/react",
  createProxyMiddleware({
    target: "https://ticket-management-1loe0umwv-traviskens-projects.vercel.app/react",
    changeOrigin: true,
    pathRewrite: {
      "^/react": "",
    },
    ws: true,
    onError: (err, req, res) => {
      console.error("React proxy error:", err)
      res.status(503).json({ error: "React app unavailable" })
    },
  }),
)

// Vue app proxy (port 5173)
app.use(
  "/vue",
  createProxyMiddleware({
    target: "https://ticket-management-1loe0umwv-traviskens-projects.vercel.app/vue",
    changeOrigin: true,
    pathRewrite: {
      "^/vue": "",
    },
    ws: true,
    onError: (err, req, res) => {
      console.error("Vue proxy error:", err)
      res.status(503).json({ error: "Vue app unavailable" })
    },
  }),
)

// Twig app proxy (port 8000)
app.use(
  "/twig",
  createProxyMiddleware({
    target: "https://ticket-management-1loe0umwv-traviskens-projects.vercel.app/twig",
    changeOrigin: true,
    pathRewrite: {
      "^/twig": "",
    },
    onError: (err, req, res) => {
      console.error("Twig proxy error:", err)
      res.status(503).json({ error: "Twig app unavailable" })
    },
  }),
)

// Root route - serve gateway page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Reverse Proxy Gateway running on http://localhost:${PORT}`)
  console.log(`\n📍 Available routes:`)
  console.log(`   - React app:  http://localhost:${PORT}/react`)
  console.log(`   - Vue app:    http://localhost:${PORT}/vue`)
  console.log(`   - Twig app:   http://localhost:${PORT}/twig`)
  console.log(`   - Gateway:    http://localhost:${PORT}`)
  console.log(`   - Health:     http://localhost:${PORT}/health\n`)
})

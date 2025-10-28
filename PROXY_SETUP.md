# Reverse Proxy Gateway Setup

This reverse proxy routes requests to all three ticket management app implementations (React, Vue.js, and Twig).

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Reverse Proxy Gateway                     │
│                    (Express.js on port 3001)                 │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐          ┌─────────┐          ┌─────────┐
    │  React  │          │   Vue   │          │  Twig   │
    │ (3000)  │          │ (5173)  │          │ (8000)  │
    └─────────┘          └─────────┘          └─────────┘
\`\`\`

## Quick Start

### Option 1: Using Docker Compose (Recommended)

\`\`\`bash
# Install dependencies
npm install
cd proxy && npm install && cd ..

# Start all services
docker-compose up

# Access the gateway at http://localhost:3001
\`\`\`

### Option 2: Manual Setup

#### 1. Start React App
\`\`\`bash
npm run dev
# Runs on http://localhost:3000
\`\`\`

#### 2. Start Vue App
\`\`\`bash
cd vue-app
npm run dev
# Runs on http://localhost:5173
\`\`\`

#### 3. Start Twig App
\`\`\`bash
cd twig
php -S localhost:8000
# Runs on http://localhost:8000
\`\`\`

#### 4. Start Reverse Proxy
\`\`\`bash
cd proxy
npm install
npm start
# Runs on http://localhost:3001
\`\`\`

## Routes

| Route | Target | Framework |
|-------|--------|-----------|
| `/` | Gateway page | HTML |
| `/react` | http://localhost:3000 | React/Next.js |
| `/vue` | http://localhost:5173 | Vue.js |
| `/twig` | http://localhost:8000 | Twig/PHP |
| `/health` | Proxy health check | JSON |

## Features

- **Unified Entry Point**: Access all three apps from a single gateway
- **WebSocket Support**: Hot module reloading works for React and Vue
- **Health Checks**: Monitor app availability from the gateway page
- **Error Handling**: Graceful error messages if an app is unavailable
- **Request Logging**: All requests are logged to the console

## Environment Variables

\`\`\`bash
PORT=3001  # Proxy server port (default: 3001)
\`\`\`

## Troubleshooting

### "App unavailable" error
- Ensure the target app is running on the correct port
- Check firewall settings
- Verify no port conflicts

### WebSocket connection failed
- This is normal for development; refresh the page
- Ensure the proxy is running with WebSocket support enabled

### CORS errors
- The proxy automatically sets `changeOrigin: true` to handle CORS
- If issues persist, check the target app's CORS configuration

## Production Deployment

For production, consider using:
- **Nginx**: High-performance reverse proxy
- **HAProxy**: Advanced load balancing
- **Vercel**: Deploy each app separately with custom domains
- **Docker**: Use the provided docker-compose.yml as a base

## Development Tips

1. **Monitor logs**: Watch the proxy console for request routing
2. **Test health endpoint**: `curl http://localhost:3001/health`
3. **Check app status**: Visit http://localhost:3001 to see real-time status
4. **Reload apps**: Each app can be reloaded independently without affecting others

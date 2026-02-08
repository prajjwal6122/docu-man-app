# Docu-Man Deployment Guide

## 🚀 Production Deployment

This guide covers how to deploy the Docu-Man application to production.

## ✅ Pre-Deployment Checklist

- [x] Cookie-based authentication implemented
- [x] Production API URL configured (`https://apis.allsoft.co/api/documentManagement`)
- [x] Test mode disabled in production
- [x] Build optimizations configured
- [x] Environment variables set

## 📦 Building for Production

### 1. Install Dependencies
```bash
cd docu-man-app
npm install
```

### 2. Build the Application
```bash
npm run build
```

This will create an optimized production build in the `dist` folder with:
- Minified code
- Code splitting (React vendor and UI vendor bundles)
- No source maps (for security)
- Optimized assets

### 3. Preview Production Build (Optional)
```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Static Hosting (Netlify, Vercel, etc.)

#### Netlify
1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in Netlify dashboard:
   - `VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement`
4. Deploy!

#### Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement`
6. Deploy!

### Option 2: Traditional Web Server (Apache, Nginx)

#### Upload Files
1. Upload the entire `dist` folder to your web server
2. Configure your web server for SPA routing

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### Apache Configuration (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 3: Docker Deployment

Create a `Dockerfile` in the `docu-man-app` directory:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t docu-man-app .
docker run -p 80:80 docu-man-app
```

## 🔒 Security Considerations

### Cookie Security
- Cookies use `Secure` flag in production (HTTPS only)
- `SameSite=Strict` for CSRF protection
- 7-day expiration by default

### HTTPS
**Important:** Deploy only on HTTPS to ensure cookie security. The `Secure` flag is automatically enabled in production.

### API Authentication
All API requests include the authentication token in the `token` header:
```javascript
headers: {
  'token': '<auth-token>'
}
```

## 🔧 Environment Variables

### Production (.env.production)
```env
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement
NODE_ENV=production
```

### Development (.env.development)
```env
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement
```

## 📋 API Endpoints Used

All endpoints are prefixed with `https://apis.allsoft.co/api/documentManagement`

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/generateOTP` | POST | No | Generate OTP for login |
| `/validateOTP` | POST | No | Validate OTP and get token |
| `/saveDocumentEntry` | POST | Yes | Upload document with metadata |
| `/searchDocumentEntry` | POST | Yes | Search documents with filters |
| `/documentTags` | POST | Yes | Get available tags |

### Request Headers for Authenticated Endpoints
```javascript
{
  "token": "<your-auth-token>"
}
```

## 🧪 Testing Production Build Locally

1. Build the app:
```bash
npm run build
```

2. Serve the build:
```bash
npm run preview
```

3. Test with production API:
   - No test credentials will work
   - Use real mobile number for OTP
   - Verify cookie storage in DevTools

## 📊 Performance Optimization

The production build includes:
- Code splitting (React vendor, UI vendor)
- Minification and tree-shaking
- Optimized chunk sizes
- Asset compression

### Bundle Analysis (Optional)
To analyze bundle size:
```bash
npm install -D rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

## 🐛 Troubleshooting

### Authentication Issues
- Check browser cookies in DevTools
- Verify API base URL is correct
- Ensure HTTPS in production

### Routing Issues (404 on Refresh)
- Configure server for SPA routing
- Use provided Nginx/Apache configs

### API Connection Issues
- Verify CORS settings on backend
- Check network tab for request/response
- Ensure API is accessible from deployment domain

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔄 Continuous Deployment

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd docu-man-app
          npm ci
      
      - name: Build
        run: |
          cd docu-man-app
          npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
      
      - name: Deploy
        # Add your deployment step here
        run: echo "Deploy to your hosting"
```

## 📞 Support

For issues or questions:
- Check the API documentation
- Review browser console for errors
- Verify network requests in DevTools

---

**Note:** This application uses cookie-based authentication. Ensure your deployment environment supports cookies and uses HTTPS for security.

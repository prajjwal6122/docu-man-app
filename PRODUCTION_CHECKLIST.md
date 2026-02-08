# Production Checklist for Docu-Man

## ✅ Pre-Deployment Checklist

### Security
- [x] Cookie-based authentication implemented
- [x] Secure flag enabled for cookies in production
- [x] SameSite flag set to Strict
- [x] Test credentials disabled in production
- [ ] HTTPS configured on hosting platform
- [ ] CORS settings verified on backend
- [ ] Environment variables properly set

### API Configuration
- [x] Production API URL configured: `https://apis.allsoft.co/api/documentManagement`
- [x] All API endpoints verified against Postman collection
- [x] Token header format set to `token: <auth-token>`
- [x] Error handling for 401 (unauthorized) responses

### Build Optimization
- [x] Production environment file created (`.env.production`)
- [x] Build command configured (`npm run build`)
- [x] Code splitting implemented (vendor chunks)
- [x] Source maps disabled in production
- [x] Minification enabled

### Testing
- [ ] Test authentication flow with real backend
- [ ] Test document upload with various file types
- [ ] Test document search with filters
- [ ] Test responsive design on mobile devices
- [ ] Test in production environment
- [ ] Verify cookie storage in browser
- [ ] Test session expiration (after 7 days)

### Performance
- [x] Lazy loading implemented where possible
- [x] Images optimized
- [x] Bundle size optimized with code splitting
- [ ] Performance testing completed
- [ ] Lighthouse score checked

### Documentation
- [x] README updated with production info
- [x] Deployment guide created
- [x] API endpoints documented
- [x] Environment variables documented

## 🚀 Deployment Steps

### 1. Build Verification
```bash
cd docu-man-app
npm install
npm run build
npm run preview
```

### 2. Test Production Build
- [ ] Login works with real OTP
- [ ] Upload document works
- [ ] Search documents works
- [ ] Auth tokens stored in cookies
- [ ] Logout clears cookies
- [ ] Protected routes redirect to login

### 3. Deploy to Platform
Choose your platform:
- [ ] Netlify
- [ ] Vercel
- [ ] Traditional server (Nginx/Apache)
- [ ] Docker container

### 4. Post-Deployment Verification
- [ ] Application accessible via HTTPS
- [ ] Authentication flow working
- [ ] All features functional
- [ ] No console errors
- [ ] API calls successful
- [ ] Cookies being set properly
- [ ] Mobile responsive design working

## 🔒 Security Verification

- [ ] Only HTTPS in production
- [ ] Cookies have Secure flag
- [ ] SameSite=Strict is set
- [ ] No sensitive data in localStorage
- [ ] No test credentials accessible
- [ ] Token automatically added to requests
- [ ] 401 responses clear auth and redirect

## 📊 Monitoring (Post-Launch)

- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor API response times
- [ ] Track user authentication errors
- [ ] Monitor failed uploads
- [ ] Check cookie expiration issues

## 🎯 Quick Deploy Commands

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t docu-man-app .
docker run -p 80:80 docu-man-app
```

## 📝 Environment Variables to Set

On your hosting platform, set:
```
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement
NODE_ENV=production
```

## ⚠️ Important Notes

1. **HTTPS is mandatory** - Cookie security requires HTTPS
2. **Test credentials disabled** - Only real OTP works in production
3. **7-day cookie expiration** - Users need to re-login after 7 days
4. **CORS must be configured** - Backend must allow your domain
5. **Token in header** - All authenticated requests use `token` header

## 📞 Support Contacts

- Backend API: Check with backend team
- Frontend Issues: Check browser console and network tab
- Deployment Issues: Refer to DEPLOYMENT.md

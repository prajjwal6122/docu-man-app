# Debugging Guide - Authentication Issues

## 🔧 Recent Fixes for Token Authentication

### Issues Fixed:
1. ✅ **Token header not being added to requests** - Fixed interceptor to ensure headers object exists
2. ✅ **FormData upload overwriting headers** - Removed manual Content-Type (axios handles it)
3. ✅ **Date format mismatch** - Changed from YYYY-MM-DD to DD-MM-YYYY
4. ✅ **Missing localStorage fallback** - Added for development debugging
5. ✅ **Poor error logging** - Added comprehensive console logs

## 🧪 How to Debug Authentication Issues

### Step 1: Check Browser Console
After logging in, you should see:
```
✅ Auth saved: { token: 'test_token_...', user: {...} }
✅ Auth initialization: { hasToken: true, hasUser: true, user: {...} }
```

### Step 2: Check Each Request
When navigating to Upload or Search pages, you should see:
```
✅ Request with token to: /documentTags | Token: test_token_1738...
✅ Response from: /documentTags | Status: 200
```

### Step 3: If You See "NO TOKEN FOUND"
```
❌ NO TOKEN FOUND for request: /documentTags
```
This means authentication was lost. Check:
1. Open DevTools → Application → Cookies
2. Look for `authToken` cookie
3. Open DevTools → Application → Local Storage
4. Look for `authToken` key

### Step 4: If You See 401 Unauthorized
```
❌ Response error: { url: '/documentTags', status: 401, ... }
🚫 UNAUTHORIZED - Clearing auth and redirecting to login
```
This means:
- Token is being sent BUT backend rejected it
- Token might be expired or invalid
- Backend might have different token validation

## 🔍 Debug Script

I've created a debug script. To use it:

1. Open browser console (F12)
2. Copy the contents of `debug-auth.js`
3. Paste and press Enter
4. Review the output

It will show:
- Your cookies
- Your localStorage
- Authentication status
- Test API call with your token

## ✅ Expected Behavior

### After Login:
```
Auth saved: { token: 'test_token_...', user: { mobile: '...', ... } }
```

### When Loading a Protected Page:
```
Auth initialization: { hasToken: true, hasUser: true, user: {...} }
```

### When Making API Calls:
```
✅ Request with token to: /documentTags | Token: test_token_...
✅ Response from: /documentTags | Status: 200
```

### Upload Document:
```
📋 Upload form data: { major_head: '...', ... }
📤 Uploading document: { major_head: '...', ... }
✅ Request with token to: /saveDocumentEntry | Token: ...
✅ Response from: /saveDocumentEntry | Status: 200
✅ Upload response: { ... }
```

### Search Documents:
```
🔍 Searching documents with filters: { ... }
✅ Request with token to: /searchDocumentEntry | Token: ...
✅ Response from: /searchDocumentEntry | Status: 200
✅ Search results: { ... }
```

## 🚨 Common Issues & Solutions

### Issue: "NO TOKEN FOUND"
**Solution:**
1. Log out and log in again
2. Check if cookies are enabled in browser
3. Check if browser is blocking cookies (Privacy settings)
4. Try in incognito mode

### Issue: "401 Unauthorized" even with token
**Solution:**
1. Backend token validation might be failing
2. Check if backend is running
3. Check backend logs for auth errors
4. Verify token format matches backend expectations
5. Token might be expired - try logging in again

### Issue: Redirects to login immediately
**Solution:**
1. Open console and look for the first error
2. Check if it's "NO TOKEN FOUND" or "401"
3. Follow the appropriate solution above

### Issue: Upload/Search redirect to login
**Solution:**
1. This means the API call returned 401
2. Check Network tab for the failed request
3. Look at Request Headers - is `token` header present?
4. Look at Response - what error did backend return?

## 📞 Still Having Issues?

1. **Clear all storage:**
   ```javascript
   localStorage.clear();
   document.cookie.split(";").forEach(c => {
     document.cookie = c.trim().split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
   });
   location.reload();
   ```

2. **Check backend:**
   - Is it running?
   - Is it accessible at `https://apis.allsoft.co/api/documentManagement`?
   - Are there CORS errors?

3. **Test with Postman:**
   - Follow the Postman collection
   - Generate OTP and get token
   - Use that token to test upload/search
   - If Postman works but frontend doesn't, it's a frontend issue

4. **Check the logs:**
   - Open browser console
   - Clear it
   - Try to upload/search
   - Copy ALL console output
   - Look for the first ❌ error

## 🎯 What Each Console Log Means

| Icon | Meaning |
|------|---------|
| ✅ | Success - operation completed |
| ❌ | Error - operation failed |
| ⚠️ | Warning - potential issue |
| 🔍 | Search operation |
| 📤 | Upload operation |
| 🏷️ | Tags operation |
| 📋 | Form data |
| 🔐 | Authentication |
| 🚫 | Unauthorized |

## 💡 Test Credentials (Development Only)

Mobile: `9999999999`
OTP: `123456`

These only work in development mode!

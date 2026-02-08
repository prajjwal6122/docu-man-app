# API Configuration Summary

## Production API Base URL
```
https://apis.allsoft.co/api/documentManagement
```

## API Endpoints

### Authentication (No Token Required)
1. **Generate OTP**
   - Endpoint: `/generateOTP`
   - Method: POST
   - Body: `{ "mobile_number": "string" }`

2. **Validate OTP**
   - Endpoint: `/validateOTP`
   - Method: POST
   - Body: `{ "mobile_number": "string", "otp": "string" }`

### Document Management (Token Required)
All these endpoints require the `token` header:

3. **Upload Document**
   - Endpoint: `/saveDocumentEntry`
   - Method: POST
   - Headers: `{ "token": "your_token" }`
   - Body: FormData with:
     - `file`: File
     - `data`: JSON string containing document metadata

4. **Search Documents**
   - Endpoint: `/searchDocumentEntry`
   - Method: POST
   - Headers: `{ "token": "your_token" }`
   - Body: Search filters object

5. **Get Document Tags**
   - Endpoint: `/documentTags`
   - Method: POST
   - Headers: `{ "token": "your_token" }`
   - Body: `{ "term": "string" }`

## Frontend Implementation

### Token Storage
- Stored in HTTP cookies (not localStorage)
- Cookie name: `authToken`
- Expires: 7 days
- Flags: Secure (HTTPS only), SameSite=Strict

### Token Injection
Automatically added to all requests via Axios interceptor:
```javascript
config.headers.token = getCookie('authToken');
```

### Error Handling
- 401 responses automatically clear cookies and redirect to login
- Network errors are logged
- Server errors (500) are logged

## Testing

### Development Mode
Test credentials (only in dev):
- Mobile: 9999999999
- OTP: 123456

### Production Mode
Must use real mobile number and receive OTP from backend.

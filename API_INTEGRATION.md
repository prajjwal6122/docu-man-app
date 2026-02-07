# API Integration Documentation

## Overview
This document details the integration of the Allsoft Document Management API endpoints based on the Postman collection.

## API Base URL
```
Production: https://apis.allsoft.co/api/documentManagement
```

## Authentication
The API uses a custom token-based authentication system:
- **Header Name**: `token`
- **Token Storage**: localStorage as `authToken`
- **Token Type**: Plain token (not Bearer)

## Endpoints

### 1. Generate OTP
**POST** `/generateOTP`

Generates and sends an OTP to the provided mobile number.

**Request Body:**
```json
{
  "mobile_number": "string"
}
```

**Implementation:**
- Service: `authService.generateOTP(mobile)`
- Used in: LoginPage.jsx (Step 1)

---

### 2. Validate OTP
**POST** `/validateOTP`

Validates the OTP and returns an authentication token.

**Request Body:**
```json
{
  "mobile_number": "string",
  "otp": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    // user data
  }
}
```

**Implementation:**
- Service: `authService.validateOTP(mobile, otp)`
- Used in: LoginPage.jsx (Step 2)
- Stores token in localStorage

---

### 3. Upload Document
**POST** `/saveDocumentEntry`

Uploads a document file with metadata.

**Headers:**
```
token: your_generated_token
Content-Type: multipart/form-data
```

**Request Body (FormData):**
- `file`: File (the document to upload)
- `data`: JSON string containing:
```json
{
  "major_head": "string",        // Category
  "minor_head": "string",         // Subcategory
  "document_date": "DD-MM-YYYY",  // Document date
  "document_remarks": "string",   // Optional remarks
  "tags": [                       // Array of tag objects
    { "tag_name": "string" },
    { "tag_name": "string" }
  ],
  "user_id": "string"            // User identifier
}
```

**Implementation:**
- Service: `documentService.uploadDocument(documentData)`
- Used in: UploadDocument.jsx
- Automatically converts form data to required format
- Uses user's mobile number or ID as user_id

---

### 4. Search Documents
**POST** `/searchDocumentEntry`

Searches for documents using filters.

**Headers:**
```
token: your_generated_token
```

**Request Body:**
```json
{
  "major_head": "string",
  "minor_head": "string",
  "from_date": "string",
  "to_date": "string",
  "tags": [
    { "tag_name": "string" },
    { "tag_name": "string" }
  ],
  "uploaded_by": "string",
  "start": 0,                    // Pagination start index
  "length": 10,                  // Number of results
  "filterId": "string",
  "search": {
    "value": "string"            // Text search query
  }
}
```

**Implementation:**
- Service: `documentService.searchDocuments(filters)`
- Used in: SearchDocuments.jsx
- Converts tags array to array of objects
- Supports pagination (default: 100 results)

---

### 5. Document Tags
**POST** `/documentTags`

Retrieves available document tags with optional filtering.

**Headers:**
```
token: your_generated_token
```

**Request Body:**
```json
{
  "term": "string"              // Optional search term
}
```

**Implementation:**
- Service: `documentService.getTags(term)`
- Used in: UploadDocument.jsx, SearchDocuments.jsx
- Default term is empty string

---

## Key Changes from Previous Implementation

### 1. Authentication Header
**Before:**
```javascript
config.headers.Authorization = `Bearer ${token}`;
```

**After:**
```javascript
config.headers.token = token;
```

### 2. Parameter Names
**Before:**
```javascript
{ mobile, otp }
```

**After:**
```javascript
{ mobile_number, otp }
```

### 3. Search Method
**Before:** GET request with query parameters
**After:** POST request with JSON body

### 4. Tags Format
**Before:**
```javascript
tags: ['tag1', 'tag2']  // Simple array
```

**After:**
```javascript
tags: [{ tag_name: 'tag1' }, { tag_name: 'tag2' }]  // Array of objects
```

### 5. Upload Data Structure
**Before:** Direct FormData
**After:** FormData with:
- `file`: the actual file
- `data`: JSON string with metadata

---

## Data Transformation

### Upload Document
The `UploadDocument.jsx` page transforms form data before sending:

```javascript
const documentData = {
  file: formData.file,
  major_head: formData.majorHead,
  minor_head: formData.minorHead,
  document_date: formData.documentDate.toISOString().split('T')[0],
  document_remarks: formData.remarks,
  tags: formData.tags.map(tag => ({ tag_name: tag })),
  user_id: user?.mobile || user?.id || 'unknown'
};
```

### Search Documents
The `SearchDocuments.jsx` page formats search parameters:

```javascript
const params = {
  major_head: filters.majorHead || '',
  minor_head: filters.minorHead || '',
  from_date: filters.fromDate ? formatDate(filters.fromDate) : '',
  to_date: filters.toDate ? formatDate(filters.toDate) : '',
  tags: filters.tags.map(tag => ({ tag_name: tag })),
  uploaded_by: '',
  start: 0,
  length: 100,
  filterId: '',
  search: { value: '' }
};
```

---

## Error Handling

All API calls include try-catch blocks with:
1. Error boundaries to prevent app crashes
2. User-friendly toast notifications
3. Proper error message extraction from API responses

Example:
```javascript
try {
  const response = await documentService.searchDocuments(params);
  // Handle success
} catch (error) {
  const errorMessage =
    error.response?.data?.message ||
    'Failed to search documents. Please try again.';
  toast.error(errorMessage);
}
```

---

## Environment Configuration

### Development (.env.development)
```env
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement
```

### Example (.env.example)
```env
# API Configuration
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement

# Environment
NODE_ENV=development
```

---

## Testing Checklist

- [ ] Login with mobile number and OTP
- [ ] Upload document with all metadata
- [ ] Search documents with various filters
- [ ] Verify tags are fetched correctly
- [ ] Test error scenarios (invalid credentials, network errors)
- [ ] Verify authentication token is included in requests
- [ ] Test file download functionality

---

## Future Enhancements

1. **Pagination**: Implement proper pagination for search results
2. **Text Search**: Add support for search.value text searching
3. **Uploaded By Filter**: Implement uploaded_by filtering
4. **Filter Presets**: Use filterId for saved search filters
5. **Real-time Updates**: Consider WebSocket integration for live updates

---

## Notes

- All authenticated requests automatically include the `token` header via interceptors
- Token is stored in localStorage and persists across sessions
- 401 responses automatically redirect to login page
- Date format for API: YYYY-MM-DD (ISO format, date only)
- File size limit: 10MB (enforced on frontend)
- Supported file types: PDF, Images (validated on frontend)

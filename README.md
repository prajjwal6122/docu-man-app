# Docu-Man - Document Management System

A modern, responsive document management system built with React and Bootstrap. Docu-Man allows users to upload, search, preview, and download documents with a clean and intuitive interface.

## 🚀 Features
live project link:-https://documan.netlify.app/login
### Core Functionality
- **Authentication**: OTP-based mobile number authentication with cookie storage
- **Document Upload**: Upload documents with metadata (category, subcategory, tags, date, remarks)
- **Advanced Search**: Search documents by category, subcategory, tags, and date range
- **Document Preview**: In-browser preview for PDF and image files
- **Download**: Download individual documents or multiple documents as a ZIP file
- **Admin Panel**: Static UI for user creation (demo only)

### Technical Features
- **Responsive Design**: Mobile-first design that works on all devices (375px+)
- **Cookie-Based Auth**: Secure token storage using cookies with Secure and SameSite flags
- **Production Ready**: Environment-specific configurations for development and production
- **Error Boundaries**: Comprehensive error handling to prevent app crashes
  - App-level error boundary catches all errors
  - Page-level error boundaries isolate errors to individual pages
  - Beautiful fallback UI with error details in development mode
- **Context API**: Global state management for authentication and notifications
- **Protected Routes**: Secure routing with authentication checks
- **Custom Hooks**: Reusable logic with useAuth, useToast, and useDebounce
- **Service Layer**: Clean separation of concerns with API services
- **Form Validation**: Comprehensive client-side validation
- **Toast Notifications**: User-friendly feedback for all actions
- **Date Picker**: Integrated date selection with react-datepicker
- **Tag Autocomplete**: Smart tag input with existing tag suggestions
- **File Upload**: Drag-and-drop file upload with preview
- **Axios Interceptors**: Automatic token injection and error handling
- **Code Splitting**: Optimized bundle sizes with vendor chunk splitting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **Git** (for version control)

## 🛠️ Installation

### 1. Clone or Navigate to the Repository

```bash
cd "e:\FRONT END\Docu-Man\docu-man-app"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 18.3.1
- React Router 6.22.0
- Bootstrap 5.3.2
- Axios 1.6.7
- react-datepicker 6.1.0
- date-fns 3.3.1
- classnames 2.5.1

### 3. Environment Configuration

The application comes with pre-configured environment files:

- `.env.development` - Development environment
- `.env.production` - Production environment  

**Production API URL**: `https://apis.allsoft.co/api/documentManagement`

For custom configurations, create a `.env` file:

```env
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement
```

**Important**: The API endpoints are already configured to work with the production backend.

## 🚦 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

**Test Credentials (Development Only)**:
- Mobile: `9999999999`
- OTP: `123456`

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized build in the `dist` folder with:
- Minified code
- Code splitting (React vendor and UI vendor bundles)
- No source maps
- Optimized assets

Preview the production build:

```bash
npm run preview
```

**Note**: Test credentials are disabled in production. You need real OTP from the backend.

### Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- Netlify/Vercel deployment
- Traditional web server setup
- Docker deployment
- Security considerations

## 📁 Project Structure

```
docu-man-app/
├── src/
│   ├── assets/           # Static assets (images, icons)
│   ├── components/       # Reusable components
│   │   ├── features/     # Feature-specific components
│   │   │   ├── DocumentCard.jsx
│   │   │   ├── DocumentPreviewModal.jsx
│   │   │   └── DocumentTable.jsx
│   │   ├── forms/        # Form components
│   │   │   ├── MobileNumberForm.jsx
│   │   │   ├── OTPForm.jsx
│   │   │   ├── SearchFilters.jsx
│   │   │   ├── UploadDocumentForm.jsx
│   │   │   └── UserCreationForm.jsx
│   │   ├── layout/       # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── ui/           # Base UI components
│   │   │   ├── Button.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── TagInput.jsx
│   │   │   └── Toast.jsx
│   │   ├── ErrorBoundary.jsx       # App-level error boundary
│   │   └── PageErrorBoundary.jsx   # Page-level error boundary
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   └── useToast.js
│   ├── pages/            # Page components
│   │   ├── AdminPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SearchDocuments.jsx
│   │   └── UploadDocument.jsx
│   ├── routes/           # Routing configuration
│   │   ├── index.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/         # API services
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── documentService.js
│   │   └── interceptors.js
│   ├── utils/            # Utility functions
│   │   ├── cookies.js    # Cookie management
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── App.jsx           # Root component
│   ├── custom.css        # Custom responsive styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .env.development      # Development environment config
├── .env.production       # Production environment config
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── DEPLOYMENT.md         # Deployment guide
├── index.html            # HTML template
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration
```

## 🔌 Backend API

**Base URL**: `https://apis.allsoft.co/api/documentManagement`

### API Endpoints

### API Endpoints

All endpoints require authentication except `/generateOTP` and `/validateOTP`.

**Authentication Header**: All authenticated requests must include:
```javascript
headers: {
  'token': '<auth-token>'
}
```

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/generateOTP` | POST | No | Generate OTP for login |
| `/validateOTP` | POST | No | Validate OTP and get token |
| `/saveDocumentEntry` | POST | Yes | Upload document with metadata |
| `/searchDocumentEntry` | POST | Yes | Search documents with filters |
| `/documentTags` | POST | Yes | Get available tags |

### Request/Response Formats

#### Generate OTP
```json
// Request
{
  "mobile_number": "9876543210"
}

// Response
{
  "status": true,
  "message": "OTP sent successfully"
}
```

#### Validate OTP
```json
// Request
{
  "mobile_number": "9876543210",
  "otp": "123456"
}

// Response
{
  "status": true,
  "token": "jwt_token_here",
  "user": {
    "mobile": "9876543210",
    "name": "User Name"
  }
}
```

#### Upload Document
```
FormData with:
- file: File (the document to upload)
- data: JSON string with:
  {
    "major_head": "Category",
    "minor_head": "Subcategory",
    "document_date": "12-02-2024",
    "document_remarks": "Optional remarks",
    "tags": [{"tag_name": "tag1"}, {"tag_name": "tag2"}],
    "user_id": "username"
  }

Headers:
- token: <auth-token>
```

#### Search Documents
```json
// Request
{
  "major_head": "",
  "minor_head": "",
  "from_date": "",
  "to_date": "",
  "tags": [{"tag_name": "tag1"}],
  "uploaded_by": "",
  "start": 0,
  "length": 10,
  "filterId": "",
  "search": {
    "value": ""
  }
}

// Headers:
// token: <auth-token>

// Response
{
  "documents": [
    {
      "id": 1,
      "file_name": "document.pdf",
      "major_head": "Category",
      "minor_head": "Subcategory",
      "tags": "tag1,tag2",
      "document_date": "2024-01-15",
      "document_remarks": "Some remarks"
    }
  ]
}
```

## 🎨 UI/UX Features

### Responsive Breakpoints
- **Mobile**: 375px - 575px (Full-width cards, stacked layout)
- **Tablet**: 576px - 991px (2-column layout)
- **Desktop**: 992px+ (3-4 column layout, sidebar always visible)
- **Large Desktop**: 1366px+ (Optimized spacing, max-width container)

### Component Patterns
- **Button States**: Primary, secondary, success, danger, loading
- **Form Validation**: Real-time validation with error messages
- **Toast Positions**: Top-right, auto-dismiss after 3 seconds
- **Modal Behavior**: ESC key to close, click backdrop to close, fullscreen on mobile
- **File Upload**: Drag-and-drop, file type/size validation, image preview
- **Tag Input**: Chip-style tags, autocomplete from existing tags, add on Enter/comma
- **Date Picker**: Calendar widget, date range validation, formatted display
- **Error Boundaries**: 
  - App-level boundary catches all errors and shows beautiful fallback
  - Page-level boundaries isolate errors to prevent full app crash
  - Development mode shows detailed error messages and stack traces
  - Production mode shows user-friendly error messages

## 🔐 Authentication & Security

### Authentication Flow

1. User enters 10-digit mobile number
2. System sends OTP via backend API
3. User enters 6-digit OTP
4. System verifies OTP and returns JWT token
5. Token stored securely in HTTP cookies
6. Token automatically included in all API requests via interceptors
7. Auto-redirect to dashboard on successful login
8. Logout clears cookies and redirects to login

### Security Features

- **Cookie-Based Storage**: Tokens stored in cookies instead of localStorage
- **Secure Flag**: Cookies marked as Secure in production (HTTPS only)
- **SameSite Protection**: SameSite=Strict for CSRF protection
- **Auto-Expiration**: Cookies expire after 7 days
- **Token Injection**: Automatic token inclusion in request headers
- **Error Handling**: 401 errors automatically clear cookies and redirect to login
- **HTTPS Required**: Production deployment requires HTTPS for cookie security

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## 🧪 Testing Checklist

### Login Flow
- [ ] Mobile number validation (10 digits)
- [ ] OTP sending
- [ ] OTP validation (6 digits)
- [ ] Login success and token storage
- [ ] Auto-redirect after login

### Document Upload
- [ ] Category selection
- [ ] Subcategory dynamic loading
- [ ] Tag autocomplete
- [ ] Date picker
- [ ] File upload with drag-drop
- [ ] File type and size validation
- [ ] Upload success with feedback

### Document Search
- [ ] Filter by category
- [ ] Filter by subcategory
- [ ] Filter by tags (multiple)
- [ ] Filter by date range
- [ ] Search results display
- [ ] Empty state when no results

### Document Preview & Download
- [ ] PDF preview in modal
- [ ] Image preview in modal
- [ ] Unsupported file message
- [ ] Single file download
- [ ] Multiple file download (ZIP)
- [ ] Download feedback

### Responsive Design
- [ ] Mobile layout (375px)
- [ ] Tablet layout (768px)
- [ ] Desktop layout (1366px)
- [ ] Sidebar collapse on mobile
- [ ] Table becomes cards on mobile
- [ ] Forms full-width on mobile

### Admin Page (Static)
- [ ] User creation form
- [ ] Username validation
- [ ] Password validation
- [ ] Confirm password match
- [ ] Created users list
- [ ] Reset form

## 🐛 Known Issues & Notes

1. **HTTPS Required for Production**: Cookie security features (Secure flag) require HTTPS in production.

2. **Backend Dependency**: The application connects to `https://apis.allsoft.co/api/documentManagement`. Ensure the backend is accessible.

3. **Static Admin Page**: The Admin page is UI-only and does not persist data. It's a demonstration of the interface.

4. **Test Mode**: Test credentials (9999999999 / 123456) only work in development mode.

5. **Date Format**: Backend expects dates in DD-MM-YYYY format.

6. **File Size Limit**: Current limit is 10MB per file. Adjust validation if backend has different limits.

7. **Cookie Expiration**: Auth cookies expire after 7 days. Users will need to login again.

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` is configured for:
- Port: 3000
- Host: localhost
- React plugin with Fast Refresh
- Production optimizations:
  - Code splitting (react-vendor, ui-vendor)
  - Minification
  - No source maps in production

### Bootstrap Customization
Bootstrap is imported via CDN in `main.jsx`. To customize:
1. Install Bootstrap source: `npm install bootstrap`
2. Create custom SCSS file
3. Import custom SCSS in `main.jsx`

## 🤝 Contributing

This is a demonstration project. For production use:
1. Fork the repository
2. Create a feature branch
3. Make your changes with proper commits
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes.

## 👨‍💻 Development Notes

### Git Workflow
The project follows conventional commits:
- `feat: ` - New features
- `fix: ` - Bug fixes
- `style: ` - Styling changes
- `docs: ` - Documentation updates
- `refactor: ` - Code refactoring

### Code Style
- Functional components with hooks
- PropTypes or TypeScript (optional)
- ESLint for code quality (configurable)
- Prettier for code formatting (configurable)

### Performance Optimization
- Lazy loading for routes
- Debounced search inputs
- Memoization for expensive computations
- Image optimization for uploads

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review backend API connectivity
3. Verify environment variables
4. Check browser console for errors
5. Review network tab for API responses

## 🎯 Future Enhancements

- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Advanced search filters (file type, size)
- [ ] Document versioning
- [ ] Bulk upload
- [ ] User roles and permissions
- [ ] Activity logs
- [ ] Document sharing
- [ ] Email notifications
- [ ] Analytics dashboard

---

**Built with ❤️ using React, Bootstrap, and Vite**

**Version**: 1.0.0  
**Last Updated**: January 2025

# Docu-Man - Document Management System

A modern, responsive document management system built with React and Bootstrap. Docu-Man allows users to upload, search, preview, and download documents with a clean and intuitive interface.

## 🚀 Features

### Core Functionality
- **Authentication**: OTP-based mobile number authentication
- **Document Upload**: Upload documents with metadata (category, subcategory, tags, date, remarks)
- **Advanced Search**: Search documents by category, subcategory, tags, and date range
- **Document Preview**: In-browser preview for PDF and image files
- **Download**: Download individual documents or multiple documents as a ZIP file
- **Admin Panel**: Static UI for user creation (demo only)

### Technical Features
- **Responsive Design**: Mobile-first design that works on all devices (375px+)
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

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Important**: The backend API should be running and accessible at the specified URL.

## 🚦 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

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
│   │   └── ui/           # Base UI components
│   │       ├── Button.jsx
│   │       ├── DatePicker.jsx
│   │       ├── EmptyState.jsx
│   │       ├── FileUpload.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── Select.jsx
│   │       ├── Table.jsx
│   │       ├── TagInput.jsx
│   │       └── Toast.jsx
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
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── App.jsx           # Root component
│   ├── custom.css        # Custom responsive styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── index.html            # HTML template
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration
```

## 🔌 Backend API Requirements

The application expects the following API endpoints:

### Authentication
- `POST /sendOTP` - Send OTP to mobile number
- `POST /verifyOTP` - Verify OTP and login

### Documents
- `GET /documentTags` - Get all available tags
- `POST /saveDocumentEntry` - Upload a document
- `GET /searchDocumentEntry` - Search documents with filters
- `GET /downloadDocument/:id` - Download a single document
- `POST /downloadMultiple` - Download multiple documents as ZIP
- `GET /previewDocument/:id` - Preview document (embed URL)

### Expected Request/Response Formats

#### Login (sendOTP)
```json
// Request
{ "mobile": "9876543210" }

// Response
{ "success": true, "message": "OTP sent successfully" }
```

#### Verify OTP
```json
// Request
{ "mobile": "9876543210", "otp": "123456" }

// Response
{
  "success": true,
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
- document: File
- major_head: string
- minor_head: string
- tags: string (comma-separated)
- document_date: string (YYYY-MM-DD)
- document_remarks: string (optional)
```

#### Search Documents
```json
// Query params
{
  "major_head": "Category",
  "minor_head": "Subcategory",
  "tags": "tag1,tag2",
  "from_date": "2024-01-01",
  "to_date": "2024-12-31"
}

// Response
{
  "documents": [
    {
      "id": 1,
      "document_id": 1,
      "file_name": "document.pdf",
      "document_name": "document.pdf",
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

## 🔐 Authentication Flow

1. User enters 10-digit mobile number
2. System sends OTP (simulated in demo)
3. User enters 6-digit OTP
4. System verifies OTP and returns JWT token
5. Token stored in localStorage and injected in all API requests
6. Auto-redirect to dashboard on successful login
7. Logout clears token and redirects to login

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

## 🐛 Known Issues

1. **Backend Dependency**: The application requires a running backend API. Ensure the backend is accessible before starting the frontend.

2. **Static Admin Page**: The Admin page is UI-only and does not persist data. It's a demonstration of the interface.

3. **OTP in Demo**: If using a demo backend, OTP might be hardcoded (e.g., "123456") for testing purposes.

4. **Date Format**: Ensure backend accepts dates in YYYY-MM-DD format.

5. **File Size Limit**: Current limit is 10MB per file. Adjust validation if backend has different limits.

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` is configured for:
- Port: 3000
- Host: 0.0.0.0 (network access)
- React plugin with Fast Refresh

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

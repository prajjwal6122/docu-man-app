import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="container mt-5">
          <div className="text-center">
            <h1 className="display-4 text-primary mb-4">Docu-Man</h1>
            <p className="lead">Document Management System</p>
            <p className="text-muted">Setting up project structure...</p>
          </div>
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App

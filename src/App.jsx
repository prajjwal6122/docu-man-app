import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from './components/ui/Toast'
import useToast from './hooks/useToast'
import AppRoutes from './routes'
import ErrorBoundary from './components/ErrorBoundary'

// App content wrapper to access toast context
function AppContent() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <AppRoutes />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App

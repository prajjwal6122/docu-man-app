import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNumberForm from '../components/forms/MobileNumberForm';
import OTPForm from '../components/forms/OTPForm';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

/**
 * Login Page Component
 * Handles OTP-based authentication
 */
const LoginPage = () => {
  const [step, setStep] = useState('mobile'); // 'mobile' or 'otp'
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Handle mobile number submission and OTP sending
  const handleSendOTP = async (mobile) => {
    setLoading(true);
    setMobileNumber(mobile);
    
    try {
      // Call API to send OTP (this is simulated in demo)
      // In production, this would call authService.sendOTP(mobile)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('OTP sent successfully to ' + mobile);
      setStep('otp');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to send OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and login
  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    
    try {
      // Call login function from AuthContext
      await login(mobileNumber, otp);
      
      toast.success('Login successful!');
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to mobile number step
  const handleBackToMobile = () => {
    setStep('mobile');
    setMobileNumber('');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                {/* Logo/Title */}
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold mb-2">Docu-Man</h2>
                  <p className="text-muted">Document Management System</p>
                </div>

                {/* Step Indicator */}
                <div className="d-flex justify-content-center mb-4">
                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        step === 'mobile'
                          ? 'bg-primary text-white'
                          : 'bg-success text-white'
                      }`}
                      style={{ width: '32px', height: '32px' }}
                    >
                      {step === 'mobile' ? '1' : '✓'}
                    </div>
                    <div
                      className="mx-2"
                      style={{
                        width: '60px',
                        height: '2px',
                        background: step === 'otp' ? '#198754' : '#dee2e6',
                      }}
                    ></div>
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        step === 'otp'
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-white'
                      }`}
                      style={{ width: '32px', height: '32px' }}
                    >
                      2
                    </div>
                  </div>
                </div>

                {/* Forms */}
                {step === 'mobile' ? (
                  <MobileNumberForm
                    onSubmit={handleSendOTP}
                    loading={loading}
                  />
                ) : (
                  <OTPForm
                    mobileNumber={mobileNumber}
                    onSubmit={handleVerifyOTP}
                    onResend={() => handleSendOTP(mobileNumber)}
                    onBack={handleBackToMobile}
                    loading={loading}
                  />
                )}

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Secure OTP-based authentication
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

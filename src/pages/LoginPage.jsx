import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNumberForm from '../components/forms/MobileNumberForm';
import OTPForm from '../components/forms/OTPForm';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import authService from '../services/authService';

// Master credentials for frontend testing (development only)
const MASTER_MOBILE = '9999999999';
const MASTER_OTP = '123456';

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
      // Check if using master mobile for frontend testing
      if (mobile === MASTER_MOBILE) {
        toast.success('Test mode: OTP is 123456');
        setStep('otp');
        setLoading(false);
        return;
      }
      
      // Call API to send OTP (works for both new and existing users)
      const response = await authService.generateOTP(mobile);
      console.log('OTP Response:', response);
      
      // Check if OTP was sent successfully
      // For new users, the API might return status: false with message about not registered
      // We'll still proceed to OTP step as the OTP serves as registration
      if (response.status === false && response.data) {
        const message = response.data.toLowerCase();
        // If message indicates user is not registered, treat it as new user registration
        if (message.includes('not') && message.includes('registered')) {
          toast.info('New user detected. An OTP will be sent for registration.');
          // Still proceed to OTP step for new user registration
          setStep('otp');
          return;
        }
        // For other errors, show error message
        toast.error(response.data || 'Failed to send OTP');
        return;
      }
      
      toast.success('OTP sent successfully to ' + mobile);
      setStep('otp');
    } catch (error) {
      console.error('OTP Error:', error);
      console.error('Error Response:', error.response?.data);
      
      // Handle different error response formats
      const errorData = error.response?.data;
      
      // Check if it's a "not registered" case
      if (errorData && errorData.data && typeof errorData.data === 'string') {
        const message = errorData.data.toLowerCase();
        if (message.includes('not') && message.includes('registered')) {
          toast.info('New user detected. An OTP will be sent for registration.');
          setStep('otp');
          return;
        }
      }
      
      let errorMessage = 'Failed to send OTP. Please try again.';
      if (errorData) {
        if (errorData.data && typeof errorData.data === 'string') {
          errorMessage = errorData.data;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and login
  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    
    try {
      // Check if using master credentials for frontend testing
      if (mobileNumber === MASTER_MOBILE && otp === MASTER_OTP) {
        // Mock successful login for testing
        const mockToken = 'test_token_' + Date.now();
        const mockUser = {
          mobile: mobileNumber,
          name: 'Test User',
          id: 'test_user_001'
        };
        
        login(mockToken, mockUser);
        toast.success('Login successful! (Test Mode)');
        navigate('/dashboard', { replace: true });
        setLoading(false);
        return;
      }
      
      // Validate OTP and get auth token
      const response = await authService.validateOTP(mobileNumber, otp);
      console.log('Validate OTP Response:', response);
      
      // Check if response indicates failure
      if (response.status === false) {
        toast.error(response.data || response.message || 'Invalid OTP');
        return;
      }
      
      // Store token and user data
      if (response.token) {
        login(response.token, response.user || { mobile: mobileNumber });
        toast.success('Login successful!');
        
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      console.error('Error Response:', error.response?.data);
      
      // Handle different error response formats
      const errorData = error.response?.data;
      let errorMessage = 'Invalid OTP. Please try again.';
      
      if (errorData) {
        if (errorData.data && typeof errorData.data === 'string') {
          errorMessage = errorData.data;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-3 p-sm-4 p-md-5">
                {/* Logo/Title */}
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold mb-2">Docu-Man</h2>
                  <p className="text-muted">Document Management System</p>
                  {step === 'mobile' && (
                    <small className="text-muted d-block mt-2">
                      Login or Register with OTP
                    </small>
                  )}
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
                    loading={loading}
                  />
                )}  <small className="text-success d-block mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Test Mode: Use mobile <strong>9999999999</strong> with OTP <strong>123456</strong>
                      </small>
                    

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Secure OTP-based authentication
                  </small>
                  {step === 'mobile' && (
                    <div className="mt-3">
                      <small className="text-info d-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Enter your mobile number to receive an OTP for login or registration.
                      </small>
                    </div>
                  )}
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

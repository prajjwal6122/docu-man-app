import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNumberForm from '../components/forms/MobileNumberForm';
import OTPForm from '../components/forms/OTPForm';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import authService from '../services/authService';

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
      // Call API to send OTP
      const response = await authService.generateOTP(mobile);
      console.log('OTP Response:', response);
      
      toast.success('OTP sent successfully to ' + mobile);
      setStep('otp');
    } catch (error) {
      console.error('OTP Error:', error);
      console.error('Error Response:', error.response?.data);
      
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
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
      // Validate OTP and get auth token
      const response = await authService.validateOTP(mobileNumber, otp);
      console.log('Validate OTP Response:', response);
      
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
      
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
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

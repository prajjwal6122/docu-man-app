import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNumberForm from '../components/forms/MobileNumberForm';
import OTPForm from '../components/forms/OTPForm';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import authService from '../services/authService';

// Master credentials for frontend testing (development only)
// DEMO MODE: Mocks all API responses for testing without backend
const MASTER_MOBILE = '9999999999';
const MASTER_OTP = '123456';
const IS_DEVELOPMENT = import.meta.env.DEV;
const ENABLE_TEST_MODE = true; // Enables demo mode with mocked API responses

/**
 * Login Page Component
 * Handles OTP-based authentication
 */
const LoginPage = () => {
  const [step, setStep] = useState("mobile"); // 'mobile' or 'otp'
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Handle mobile number submission and OTP sending
  const handleSendOTP = async (mobile) => {
    setLoading(true);
    setMobileNumber(mobile);

    try {
      // Check if using master mobile for frontend testing (development only)
      if (IS_DEVELOPMENT && ENABLE_TEST_MODE && mobile === MASTER_MOBILE) {
        console.log("✅ Test mode activated for mobile:", mobile);
        console.warn("⚠️ Test mode: Mock token won't work with real API!");
        toast.success("Test mode: OTP is 123456");
        setStep("otp");
        setLoading(false);
        return;
      }

      console.log("📤 Sending OTP request for mobile:", mobile);
      
      // Call API to send OTP (works for both new and existing users)
      const response = await authService.generateOTP(mobile);
      console.log("📥 OTP API Response:", response);

      // SUCCESS: Check if response indicates OTP was sent
      if (response.status === true || response.success === true) {
        const message = response.data || response.message || "OTP sent successfully";
        console.log("✅ OTP sent successfully:", message);
        toast.success(message + " to " + mobile);
        setStep("otp");
        return;
      }

      // SPECIAL CASE: User not registered
      if (response.status === false && response.data) {
        const message = String(response.data).toLowerCase();
        console.log("⚠️ API returned status false with message:", response.data);
        
        // If user is not registered - backend doesn't send OTP for unregistered users
        if (message.includes("not") && (message.includes("register") || message.includes("exist"))) {
          console.error("❌ User not registered - OTP not sent");
          toast.error(response.data);
          toast.info("Please contact admin to register your mobile number first.", { duration: 5000 });
          return;
        }
        
        // If OTP was actually sent despite status false
        if (message.includes("otp") && message.includes("sent")) {
          console.log("✅ OTP sent (status false but message says sent)");
          toast.success(response.data);
          setStep("otp");
          return;
        }
        
        // Other errors with status false
        console.error("❌ API error:", response.data);
        toast.error(response.data || "Failed to send OTP");
        return;
      }

      // UNCLEAR RESPONSE: If we reach here, API response is unclear
      console.warn("⚠️ Unclear API response:", response);
      toast.error("Unexpected response from server. Please try again.");

    } catch (error) {
      console.error("❌ OTP Generation Error:", error);
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", error.response?.status);

      // Handle network/connection errors
      if (!error.response) {
        console.error("❌ Network error - no response from server");
        toast.error("Network error. Please check your connection and try again.");
        return;
      }

      const errorData = error.response?.data;
      const errorStatus = error.response?.status;

      // 404: Endpoint not found
      if (errorStatus === 404) {
        console.error("❌ API endpoint not found");
        toast.error("API endpoint not found. Please contact support.");
        return;
      }

      // Handle "not registered" error - backend doesn't send OTP for unregistered users
      if (errorData && errorData.data && typeof errorData.data === "string") {
        const message = String(errorData.data).toLowerCase();
        
        if (message.includes("not") && (message.includes("register") || message.includes("exist"))) {
          console.error("❌ User not registered - OTP not sent");
          toast.error(errorData.data);
          toast.info("Please contact admin to register your mobile number first.", { duration: 5000 });
          return;
        }
        
        // If error message mentions OTP was sent anyway
        if (message.includes("otp") && message.includes("sent")) {
          console.log("✅ OTP sent (from error response)");
          toast.success(errorData.data);
          setStep("otp");
          return;
        }
      }

      // Extract error message
      let errorMessage = "Failed to send OTP. Please try again.";
      if (errorData) {
        if (errorData.data && typeof errorData.data === "string") {
          errorMessage = errorData.data;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("❌ Final error message:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and login
  const handleVerifyOTP = async (otp) => {
    setLoading(true);

    try {
      // Check if using master credentials for frontend testing (development only)
      if (
        IS_DEVELOPMENT &&
        ENABLE_TEST_MODE &&
        mobileNumber === MASTER_MOBILE &&
        otp === MASTER_OTP
      ) {
        console.log("✅ Test mode login activated");
        console.warn("⚠️ WARNING: Mock token won't work with real API endpoints!");
        console.warn("⚠️ Use a real mobile number to test API functionality");
        // Mock successful login for testing
        const mockToken = "test_token_" + Date.now();
        const mockUser = {
          mobile: mobileNumber,
          name: "Test User",
          id: "test_user_001",
          role: "user"
        };

        login(mockToken, mockUser);
        toast.success("Login successful! Welcome to Demo Mode");
        toast.info("Demo Mode: Using mocked data for testing", { duration: 4000 });
        navigate("/dashboard", { replace: true });
        setLoading(false);
        return;
      }

      console.log("🔐 Validating OTP for mobile:", mobileNumber);
      
      // Validate OTP and get auth token
      const response = await authService.validateOTP(mobileNumber, otp);
      console.log("📥 Validate OTP Response:", response);

      // SUCCESS: Check if we got a token (most important)
      if (response.token) {
        console.log("✅ Token received, logging in user");
        const userData = response.user || response.data?.user || { mobile: mobileNumber };
        login(response.token, userData);
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
        return;
      }

      // SUCCESS with different format: Check status true
      if (response.status === true && response.data) {
        // Sometimes token might be nested in data
        if (response.data.token) {
          console.log("✅ Token received in data object");
          const userData = response.data.user || { mobile: mobileNumber };
          login(response.data.token, userData);
          toast.success("Login successful!");
          navigate("/dashboard", { replace: true });
          return;
        }
      }

      // FAILURE: Check if response indicates failure
      if (response.status === false) {
        const errorMsg = response.data || response.message || "Invalid OTP";
        console.error("❌ OTP validation failed:", errorMsg);
        toast.error(errorMsg);
        return;
      }

      // UNCLEAR: If we got here, response format is unexpected
      console.error("❌ Unexpected response format:", response);
      toast.error("Invalid response from server. Please try again.");

    } catch (error) {
      console.error("❌ Verify OTP Error:", error);
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", error.response?.status);

      // Handle different error response formats
      const errorData = error.response?.data;
      let errorMessage = "Invalid OTP. Please try again.";

      if (errorData) {
        if (errorData.data && typeof errorData.data === "string") {
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
    setStep("mobile");
    setMobileNumber("");
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
                  {step === "mobile" && (
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
                        step === "mobile"
                          ? "bg-primary text-white"
                          : "bg-success text-white"
                      }`}
                      style={{ width: "32px", height: "32px" }}
                    >
                      {step === "mobile" ? "1" : "✓"}
                    </div>
                    <div
                      className="mx-2"
                      style={{
                        width: "60px",
                        height: "2px",
                        background: step === "otp" ? "#198754" : "#dee2e6",
                      }}
                    ></div>
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        step === "otp"
                          ? "bg-primary text-white"
                          : "bg-secondary text-white"
                      }`}
                      style={{ width: "32px", height: "32px" }}
                    >
                      2
                    </div>
                  </div>
                </div>

                {/* Forms */}
                {step === "mobile" ? (
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

                {/* Test Mode Info - Only in Development */}
                {IS_DEVELOPMENT && ENABLE_TEST_MODE && (
                  <div className="text-center mt-3">
                    <div className="alert alert-info mb-0" role="alert">
                      <h6 className="alert-heading mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="me-2"
                          style={{ verticalAlign: 'text-bottom' }}
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Demo Mode Credentials
                      </h6>
                      <p className="mb-2">
                        <strong>Mobile:</strong> 9999999999<br/>
                        <strong>OTP:</strong> 123456
                      </p>
                      <small className="text-muted">
                        Uses mock data for testing • Full UI functionality enabled
                      </small>
                    </div>
                  </div>
                )}
                {IS_DEVELOPMENT && !ENABLE_TEST_MODE && (
                  <div className="text-center mt-3">
                    <small className="text-info d-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="me-1"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      Development Mode: Use real mobile number to test API
                    </small>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Secure OTP-based authentication
                  </small>
                  {step === "mobile" && (
                    <div className="mt-3">
                      <small className="text-info d-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="me-1"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Enter your mobile number to receive an OTP for login or
                        registration.
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

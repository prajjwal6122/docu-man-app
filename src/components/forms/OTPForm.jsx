import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import './OTPForm.css';

/**
 * OTP Form Component
 * Handles 6-digit OTP input with auto-focus and auto-advance
 */
const OTPForm = ({ onSubmit, onResend, loading, mobileNumber = '' }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError('');

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    onSubmit(otpValue);
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
      inputRefs.current[0]?.focus();
      onResend();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          {mobileNumber ? `Enter OTP sent to ${mobileNumber}` : 'Enter OTP'}
        </label>
        <div className="otp-input-container d-flex justify-content-between gap-2 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`form-control otp-input text-center ${error ? 'is-invalid' : ''}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={loading}
              autoFocus={index === 0}
            />
          ))}
        </div>
        {error && <div className="text-danger small">{error}</div>}
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="w-100 mb-3"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>

      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            className="btn btn-link text-decoration-none p-0"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        ) : (
          <span className="text-muted">
            Resend OTP in {resendTimer}s
          </span>
        )}
      </div>
    </form>
  );
};

export default OTPForm;

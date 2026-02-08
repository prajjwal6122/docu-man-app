import React, { useEffect } from "react";
import "./Modal.css";

/**
 * Reusable Modal Component
 */
const Modal = ({
  show,
  onClose,
  title,
  children,
  size = "md", // sm, md, lg, xl, fullscreen
  showCloseButton = true,
  closeOnBackdrop = true,
  footer = null,
}) => {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && show) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [show, onClose]);

  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleBackdropClick}
      tabIndex="-1"
    >
      <div
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable modal-${size}`}
      >
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              {showCloseButton && (
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              )}
            </div>
          )}

          <div className="modal-body">{children}</div>

          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;

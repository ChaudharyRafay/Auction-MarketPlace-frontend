import React from "react";
import { Toast } from "react-bootstrap";
function ToastComponent({ open, type, text }) {
  return (
    <div>
      <Toast
        // onClose={() => setToast(false)}
        autohide
        // show={showToast}
        delay={2200}
      >
        {/* <Toast.Header>
      <strong className="mr-auto">React Toast</strong>
     
    </Toast.Header> */}
        <Toast.Body>
          {" "}
          <strong className="mr-auto">React Toast</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastComponent;

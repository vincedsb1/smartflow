import React from "react";

const GoogleAuthButton = () => {
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return <button onClick={handleGoogleSignup}>Signup with Google</button>;
};

export default GoogleAuthButton;

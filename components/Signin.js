import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        backgroundImage: 'url(\'/images/logo.png\')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1 style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: '20px',
        borderRadius: '10px',
        color: '#000', // Black text color
        width: 'fit-content', // Adjust width as needed
        margin: '0 auto', // Center horizontally
      }}
      >Track It
      </h1>
      <p style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: '20px',
        borderRadius: '10px',
        color: '#000', // Black text color
        width: 'fit-content', // Adjust width as needed
        margin: '0 auto', // Center horizontally
      }}
      >Click the button below to login!
      </p>
      <Button style={{ background: 'rgba(255, 255, 255, 0.8)', border: 'none', color: '#000' }} type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Use QRCodeCanvas instead of QRCode
import { toPng } from 'html-to-image';
import './App.css'; // Ensure this import is present to apply styles

function QRcode() {
  const [url, setUrl] = useState('');
  const [showQR, setShowQR] = useState(false);  // State to control display of QR code
  const qrRef = useRef();

  const handleDownload = () => {
    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      })
      .catch((error) => {
        console.error('Failed to download the image', error);
      });
  };

  const handleDisplayQR = () => {
    if (showQR) {
      alert('QR Code has already been displayed');
    } else if (url) {
      setShowQR(true);
    } else {
      alert('Please enter a valid URL');
    }
  };

  // Handle input change and hide QR code when the input is modified
  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setShowQR(false);  // Hide QR code when the user changes the input
  };

  return (
    <div className="qr-app-container">
      <div className="title-container">
        <h1>QR Code Generator</h1>
      </div>
      <input
        type="text"
        placeholder="Enter Text or URL"
        value={url}
        onChange={handleInputChange}  // Update on input change
      />
      <br />
      <button
        onClick={handleDisplayQR}
        className="qr-button"
      >
        <h3>Generate QR Code</h3>
      </button>
      
      {/* Display QR code only if showQR is true */}
      {showQR && (
        <div className="qr-container" ref={qrRef}>
          <QRCodeCanvas value={url} size={256} />
          <br />
          <button onClick={handleDownload} className="qr-button">
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default QRcode;

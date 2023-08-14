import React, { useState, useEffect } from 'react';
import PaymentsPage from '../pages/PaymentsPage';
import ActivationPage from '../pages/ActivationPage';
import LoadingComponent from './LoadingComponent'

function QRHandler() {
  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchQRDetails() {
      // Extract uuid from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get('uuid');
      
      if (!uuid) {
        console.error("UUID not provided in URL");
        return;
      }

      // Fetch QR details from server
      try {
        const response = await fetch('https://qr-pay.onrender.com/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: uuid }),
        });

        const data = await response.json();
        setQrData(data);
      } catch (error) {
        console.error("Error fetching QR details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQRDetails();
  }, []);

  if (isLoading) return <LoadingComponent />;

  if (qrData && qrData.isActivated) {
    return <PaymentsPage uuid={qrData.uuid} />;
  } else {
    return <ActivationPage uuid={qrData.uuid} />;
  }
}

export default QRHandler;

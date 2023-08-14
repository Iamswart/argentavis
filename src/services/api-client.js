// api.js

const BASE_URL = "https://qr-pay.onrender.com";

export const fetchQRCodes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/generateQR`);
    const data = await response.json();
    return data.qr;
  } catch (error) {
    throw new Error("Failed to fetch QR codes from the server.");
  }
};


export const activateQRCode = async (uuid, firstName, lastName, accountNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: uuid,
          firstName,
          lastName,
          accountNumber
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to activate QR code.");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
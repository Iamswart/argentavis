import { useRef } from 'react';
import { QRImage } from 'react-qrbtf';
import * as toImage from 'html-to-image';

function QrCode() {
  const qrRef = useRef(null);

  const downloadImage = () => {
    if (qrRef.current) {
      toImage.toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'myQRCode.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Error converting to image:', err);
        });
    }
  };

  return (
    <div>
      <div ref={qrRef}>
        <QRImage
          value="https://momo-payment-48xe4nhf9-iamswart.vercel.app/"
          image="https://res.cloudinary.com/dfscst5lw/image/upload/v1691521410/portfolio_website/momo_lw8kpd.png"
          type="rect"
          size={90}
          opacity={80}
          darkColor="#000"
          lightColor="#ff"
          posType="rect"
          posColor="#000"
        />
      </div>
      <button onClick={downloadImage}>Download QR Code</button>
    </div>
  );
}

export default QrCode;

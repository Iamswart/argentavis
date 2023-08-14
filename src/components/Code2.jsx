import { useRef } from "react";
import { QRImage } from "react-qrbtf";
import * as toImage from "html-to-image";

function Code2() {
  return (
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
  );
}

export default Code2;

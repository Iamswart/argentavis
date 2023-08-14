import { QRNormal } from "react-qrbtf";

function Code1() {
  return (
    <QRNormal
      value="https://momo-payment-48xe4nhf9-iamswart.vercel.app/"
      className="my-qrcode"
      styles={{ svg: { width: "200px" } }}
      type="round"
      size={50}
      opacity={80}
      posType="planet"
      otherColor="#33CCCC"
      posColor="#009999"
    />
  );
}

export default Code1;

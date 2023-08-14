import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as toImage from 'html-to-image';


export const handleDownloadAll = async () => {
  const zip = new JSZip();
  const promises = [];

  cardRefs.current.forEach((cardRef, index) => {
    const promise = toImage.toBlob(cardRef)
      .then(blob => {
        zip.file(`QRCode-${index + 1}.png`, blob);
      });
    promises.push(promise);
  });

  await Promise.all(promises);
  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "QR_Codes.zip");
  });
};

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

const PdfToImageConverter = ({setData}) => {
  const [imageData, setImageData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.mjs';
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1); // Get the first page of the PDF
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
        const imageData = canvas.toDataURL('image/jpeg', 1.0);
        setImageData(imageData);
        setData(imageData)

        setErrorMessage('');
      };
    } catch (error) {
      setErrorMessage('Error converting PDF to image');
      console.error('Error converting PDF to image:', error);
    }
  };

  return (
    <div className="pdf-to-image-converter">
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      {imageData && <img src={imageData} alt="Converted PDF" />}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PdfToImageConverter;

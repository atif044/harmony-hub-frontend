// Modal.js
import React,{useState} from 'react';
import html2pdf from 'html2pdf.js';
import logo from '../../../assets/bulc.png'
const Modal = ({ imageUrl, onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [img,setimg]=useState('')
    const preloadImage = () => {
        const img = new Image();
        img.src = imageUrl;
        setimg(img)
        img.onload = () => {
          setImageLoaded(true);
        };
      };
      
    const makePdf=async()=>{
        const element = document.getElementById("pdf")
        console.log(element)
        const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('mt-64', '-mb-64'); // Add classes to the wrapper div
    wrapperDiv.appendChild(element.cloneNode(true));
        console.log(wrapperDiv)
          const options = {
            filename: 'GFkjG.pdf',
            margin: 0,

            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3,useCORS: true },
            jsPDF: {
              unit: 'in',
              orientation: 'portrait'
            }
          };
          html2pdf().set(options).from(wrapperDiv).save();
           
      }
  return (
    <div className="fixed z-10   inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl  font-bold">Certificate</p>
              <button
                className="modal-close cursor-pointer z-50"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div id="pdf"  className="modal-body mt-10 -mb-32">
              <img id='pdf1' src={imageUrl} alt="Modal" className="w-full" />
            </div>
            <div className="flex justify-end pt-2">
              <button
                className="modal-close px-4 bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-400"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="px-4 bg-blue-500 p-3 ml-4 rounded-lg text-white hover:bg-blue-400"
                onClick={makePdf}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useRef, useState ,createRef} from 'react';
import html2pdf from 'html2pdf.js';
import IssueCertificate from './IssueCertificate';
import bulc from '../../../assets/bulc.png'
const CertificateOfParticipation = ({ participantName, eventDescription, eventDetails, participationDate, qrCodeLink }) => {
  const certificateRef = createRef();
  
  const [details,SetDetails]=useState({
    name:"",
    eventDescription:"",
    universityName:"",
    organizationName:"",
    eventName:""
  });

  const makePdf=async()=>{
    console.log(details)
    const element = document.getElementById('imageConvert');
      const options = {
        filename: 'GFG.pdf',
        margin: 0,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
        }
      };
      html2pdf().set(options).from(element).save();
       
  }
  const uploadToCloudinary = async (image) => {
    try{
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch(`http://localhost:5000/api/v1/admin/uploadCertificate`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Image uploaded to Cloudinary:', data);
      return data;
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <>
    <div className="container mx-auto px-4 py-8 hidden" style={{ minWidth: '11in', minHeight: '8.5in', overflow: 'hidden' }}>
      <div ref={certificateRef}   id="imageConvert"  className="bg-gradient-to-br from-blue-500 to-green-400 rounded-lg shadow-lg p-8 flex flex-col md:flex-row w-full h-full">
        {/* Harmony Hub logo */}
        <div className="flex-none mb-8 md:mb-0 md:mr-12">
          <img src={bulc} alt="Harmony Hub Logo" className="h-20 w-20 mr-4" />
        </div>
        {/* Content */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-white mb-4">Certificate of Participation</h1>
          {/* Collaborating organizations logos */}
          <div className="mb-6 text-white flex flex-wrap">
{           details.universityName!==""&& 
<h1 className="h-20 w-auto mr-4 mb-4" >{details.universityName}  </h1>
      
}
<br/>         
   <h1 className="h-20 w-auto mr-4 mb-4" >{details.organizationName}</h1>
            {/* Add spaces for more logos */}
          </div>
          {/* Participant details */}
          <div className="mb-6 text-white">
            <p>{eventDescription}</p>
            <p>This certifies that</p>
            <h2 className="text-lg font-bold mb-2">{details.name}</h2>
            {/* <p>S/o {fatherName}</p> */}
            <p>has participated in the following event:</p>
            <p className="text-lg font-bold mb-2">{details.eventName}</p>
          </div>
          {/* Issuer and partner signatures */}
          <div className="text-white flex justify-between">
            <div>
              <p>Issued by:</p>
              <img src="https://onlinepngtools.com/images/examples-onlinepngtools/george-walker-bush-signature.png" alt="CEO Signature" className="h-36 w-36 mr-4 mb-4" />
              {/* Add CEO's signature image here */}
            </div>
            <div>
              <p>Partnering Platforms:</p>
              <img src="https://onlinepngtools.com/images/examples-onlinepngtools/george-walker-bush-signature.png" alt="Partner Signature" className="h-36 w-36 mr-4 mb-4" />
              {/* Add signatures of partnering platforms here */}
            </div>
          </div>
        </div>
      </div>
      <button onClick={uploadToCloudinary} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload to Cloudinary</button>
    </div>
      <IssueCertificate makePdf={makePdf} details={details} SetDetails={SetDetails} uploadToCloudinary={uploadToCloudinary}/>
    </>
  );
};
export default CertificateOfParticipation;


import React, { useState } from 'react';

const MyComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChangeLocation = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    
    // Call the LocationIQ API for autocomplete suggestions
    if (inputValue.trim() === '') {
      setResults([]);
      return;
    }

    fetch(`https://us1.locationiq.com/v1/autocomplete.php?key=pk.2c4f94512b9b8161910660ec686d8a27&q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        if (data?.error) {
          setResults([]);
          return;
        }
        setResults(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const handleSelectLocation = (result) => {
    setQuery(result.display_name);
    setResults([]);
  };
  return (
    <div className="dropdown">
      <input
        type="text"
        value={query}
        onChange={handleChangeLocation}
        placeholder="Enter location..."
      />
      <ul className="dropdown-content">
        {results.map((result, index) => (
          <li key={index} onClick={() => handleSelectLocation(result)}>
            {result.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;

// import React from 'react';

// const MyComponent = () => {
//   // Assuming your data is stored in a variable named 'locationData'
//   const locationData = {
//     address: {
//       city: "Islamabad",
//       country: "Pakistan",
//       country_code: "pk",
//       name: "Bahria University",
//       postcode: "44000",
//       road: "Street 21",
//       state: "Islamabad Capital Territory",
//       suburb: "E-8",
//     },
//     boundingbox: ["33.7157049", "33.7158049", "73.0282867", "73.0283867"],
//     class: "building",
//     display_address: "Street 21, E-8, Islamabad, Islamabad Capital Territory, 44000, Pakistan",
//     display_name: "Bahria University, Street 21, E-8, Islamabad, Islamabad Capital Territory, 44000, Pakistan",
//     display_place: "Bahria University",
//     lat: "33.7157549",
//     licence: "https://locationiq.com/attribution",
//     lon: "73.0283367",
//     osm_id: "3502725824",
//     osm_type: "node",
//     place_id: "320967001633",
//     type: "university",
//   };

//   // Create the embedded map URL with a marker
//   const mapUrl = `https://maps.locationiq.com/v2/staticmap?key=pk.2c4f94512b9b8161910660ec686d8a27&center=${locationData.lat},${locationData.lon}&zoom=15&size=600x450&markers=${locationData.lat},${locationData.lon}`;

//   // Create the Google Maps URL to open on click
//   const googleMapsUrl = `https://www.google.com/maps?q=${locationData.lat},${locationData.lon}`;

//   return (
//     <div>
//       {/* Render an anchor tag around the image to open Google Maps on click */}
//       <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
//         <img src={mapUrl}  alt="Map" width="450" height="450" />
//       </a>
//     </div>
//   );
// };

// export default MyComponent;

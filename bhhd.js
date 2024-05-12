import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
function App() {
    const [web3, setWeb3] = useState(null);

    // Initialize Web3Modal
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
            metamask: {
                // Config for MetaMask provider
                display: {
                    name: "MetaMask",
                    description: "Connect with MetaMask",
                },
                package: null,
                connector: async (providerOptions) => {
                    // Here, we return the provider from window.ethereum
                    if (window.ethereum) {
                        await window.ethereum.enable();
                        return window.ethereum;
                    }
                    throw new Error("MetaMask is not installed");
                },
            },
        },
    });

    // Connect to MetaMask
    const connectToMetaMask = async () => {
        try {
            // Connect to the Ethereum network
            const provider = await web3Modal.connect();
            const web3Instance = new Web3(provider);
            setWeb3(web3Instance);
            console.log("Connected to MetaMask:", provider);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

    // Add Certification
    const addCertification = async () => {
        try {
            if (!web3) {
                console.error("Web3 not initialized.");
                return;
            }

            // Load your contract ABI and address
            const contractABI = [
                // Your contract ABI here
            ];
            const contractAddress = "YOUR_CONTRACT_ADDRESS";

            // Instantiate the contract
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            // Call the addCertification function
            await contract.methods.addCertification("CertName", "user@example.com", "https://certlink.com", 1, "0xYourIssuerAddress").send({
                from: web3.eth.defaultAccount,
            });

            console.log("Certification added successfully!");
        } catch (error) {
            console.error("Error adding certification:", error);
        }
    };

    return (
        <div>
            <h1>Web3Modal Example with React</h1>
            <button onClick={connectToMetaMask}>Connect to MetaMask</button>
            <button onClick={addCertification}>Add Certification</button>
        </div>
    );
}

export default App;

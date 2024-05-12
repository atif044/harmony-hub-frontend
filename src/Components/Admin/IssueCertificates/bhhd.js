import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { marketAbi, marketAddress } from '../../../contract/constant';

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

export const connectToMetaMask = async () => {
    try {
        // Connect to the Ethereum network
        const provider = await web3Modal.connect();
        const web3Instance = new Web3(provider);
        console.log("Connected to MetaMask:", provider);
        return web3Instance;
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        return null;
    }
};

export const addCertification = async (web3,acc,name,email,link,id,address) => {
    try {
        console.log(acc)
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
        const contract = new web3.eth.Contract(marketAbi, marketAddress);

        // Call the addCertification function
        console.log(email,name,link,id,acc)
        await contract.methods.addCertification(name,email,link,id,acc).send({
            from: acc,
        });

        console.log("Certification added successfully!");
    } catch (error) {
        console.error("Error adding certification:", error);
    }
};

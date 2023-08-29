import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract, metamaskWallet } from "@thirdweb-dev/react";
import App from './App'
import './index.css'
import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain={ Sepolia } clientId='d8f33da3f70bc3400c421cd109b264b4'>
        <Router>
            <StateContextProvider supportedWallets={[metamaskWallet()]}>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)
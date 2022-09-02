import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext(null);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({ provider, signer, transactionContract });
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      // console.log(accounts);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions();
      } else console.log('No accounts found.');
    } catch (error) {
      console.error(error);
      throw new Error('Error checking wallet.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('Error connecting to wallet.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      // get the data from form
    } catch (error) {
      console.error(error);
      throw new Error('Error sending transaction.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ currentAccount, formData, setFormData, connectWallet, handleChange }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {React , useEffect , useState } from 'react'
import Web3 from 'web3'

export default function Home() {
  const [accounts, setAccounts] = useState()

  let web3 =  new Web3()
  const ethEnabled = async () => {

    if (typeof window.ethereum !== 'undefined') {
      // Instance web3 with the provided information from the MetaMask provider information
       web3 = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethereum.enable();
        window.ethereum.on('accountsChanged', function (accounts) {
          console.log('accountsChanges',accounts);
    
        });
    
         // detect Network account change
        window.ethereum.on('networkChanged', function(networkId){
          console.log('networkChanged',networkId);
        });

        return true
      } catch (e) {
        // User denied access
        return false
      }

    }

    return false;
  }


  const onClickConnect = async () => {

    if (await !ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }

    var accs = await web3.eth.getAccounts();
    console.log(accs)
    setAccounts(accs[0])


   

  }
 
  
  return (
    <div className={styles.container}>
      <Head>
        <title>VideoNFTs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={onClickConnect}> Connect </button>
        <h1 className={styles.title}>
          Welcome to VideoNFTs !
        </h1>

        

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>{accounts}</h3>
            <p>Your wallet address </p>
          </a>

          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '} Fleek
        </a>
      </footer>
    </div>
  )
}

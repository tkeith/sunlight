import { SubmitButton, TextButton, TextInput } from '../components/examples/misc'
import { useAccount, useBalance, useNetwork, useProvider } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import RequireWalletContainer from '../components/examples/RequireWalletContainer'

import { ERC721Order, NFTOrder, SignatureType } from "@0x/protocol-utils";
import utils from "@0x/utils";
import { TradeDirection } from '@0x/protocol-utils/lib/src/nft_orders'
import { parseInt } from 'lodash'
import { parseEther } from 'ethers/lib/utils'

import BigNumber from "bignumber.js";
import Web3 from 'web3'

import { Web3Wrapper } from '@0x/web3-wrapper';

import { ethers } from 'ethers';
import { SupportedProvider } from 'ethereum-types';

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { UseContractWriteMutationArgs } from 'wagmi/dist/declarations/src/hooks/contracts/useContractWrite';


const WETH_ADDR = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

const contractAbi = [{"anonymous": false, "inputs": [{"indexed": false, "internalType": "uint8", "name": "version", "type": "uint8"}], "name": "Initialized", "type": "event"}, {"anonymous": false, "inputs": [{"components": [{"components": [{"internalType": "enum TradeDirection", "name": "direction", "type": "uint8"}, {"internalType": "address", "name": "maker", "type": "address"}, {"internalType": "address", "name": "taker", "type": "address"}, {"internalType": "uint256", "name": "expiry", "type": "uint256"}, {"internalType": "uint256", "name": "nonce", "type": "uint256"}, {"internalType": "address", "name": "erc20Token", "type": "address"}, {"internalType": "uint256", "name": "erc20TokenAmount", "type": "uint256"}, {"internalType": "uint256", "name": "fees", "type": "uint256"}, {"internalType": "address", "name": "erc721Token", "type": "address"}, {"internalType": "uint256", "name": "erc721TokenId", "type": "uint256"}, {"internalType": "uint256", "name": "erc721TokenProperties", "type": "uint256"}], "internalType": "struct ERC721Order", "name": "order", "type": "tuple"}, {"components": [{"internalType": "enum SignatureType", "name": "signatureType", "type": "uint8"}, {"internalType": "uint8", "name": "v", "type": "uint8"}, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {"internalType": "bytes32", "name": "s", "type": "bytes32"}], "internalType": "struct Signature", "name": "signature", "type": "tuple"}], "indexed": false, "internalType": "struct MainContract.Offer", "name": "offer", "type": "tuple"}], "name": "OfferCreated", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}], "name": "OwnershipTransferred", "type": "event"}, {"inputs": [{"components": [{"internalType": "enum TradeDirection", "name": "direction", "type": "uint8"}, {"internalType": "address", "name": "maker", "type": "address"}, {"internalType": "address", "name": "taker", "type": "address"}, {"internalType": "uint256", "name": "expiry", "type": "uint256"}, {"internalType": "uint256", "name": "nonce", "type": "uint256"}, {"internalType": "address", "name": "erc20Token", "type": "address"}, {"internalType": "uint256", "name": "erc20TokenAmount", "type": "uint256"}, {"internalType": "uint256", "name": "fees", "type": "uint256"}, {"internalType": "address", "name": "erc721Token", "type": "address"}, {"internalType": "uint256", "name": "erc721TokenId", "type": "uint256"}, {"internalType": "uint256", "name": "erc721TokenProperties", "type": "uint256"}], "internalType": "struct ERC721Order", "name": "order", "type": "tuple"}, {"components": [{"internalType": "enum SignatureType", "name": "signatureType", "type": "uint8"}, {"internalType": "uint8", "name": "v", "type": "uint8"}, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {"internalType": "bytes32", "name": "s", "type": "bytes32"}], "internalType": "struct Signature", "name": "signature", "type": "tuple"}], "name": "createOffer", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "owner", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]

const contractAddr = '0x7457f951D21005677191e614c4781a63f297bdca'

function Main() {
  const useProviderResults = useProvider();
  const { address } = useAccount();
  const { chain } = useNetwork()
  const { data: balanceData } = useBalance({
    addressOrName: address,
    watch: true,
  });

  // const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
  //   useSendTransaction({
  //     request: {
  //       to: '0x108C9FCd65e80c9999B34F85888861B4E20AA54d',
  //       value: BigNumber.from('1'), // 1 wei
  //     },
  //   });

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddr,
    contractInterface: contractAbi,
    functionName: 'createOffer',
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  function createOffer(event: React.FormEvent) {
    event.preventDefault()

    ;(async function () {

      const formData = new FormData(event.target as HTMLFormElement)

      function getField(name: string): string {
        const data = formData.get(name)
        if (data === null) {
          throw Error('formdata is null')
        }
        return data.toString()
      }

      function getInt(name: string): number {
        return parseInt(getField(name))
      }


      function getEth(name: string) {
        return parseEther(getField(name))
      }

      function getBigNumber(name: string) {
        return new BigNumber(getField(name))
      }
      
      // const dir = TradeDirection[getInt('direction')]

      const order = new ERC721Order({
        chainId: 1,
        verifyingContract: '0xdef1c0ded9bec7f1a1670819833240f027b25eff', 
        direction: getInt('direction') as TradeDirection,
        erc20Token: WETH_ADDR,
        erc20TokenAmount: new BigNumber(getEth('amount').toString()),
        erc721Token: getField('tokenAddr'),
        erc721TokenId: getBigNumber('tokenId'),
        maker: address,
        taker: '0x0000000000000000000000000000000000000000',
        nonce: new BigNumber(new Date().getTime()),
        expiry: new BigNumber(Math.floor(Date.now() / 1000 + 3600 * 24)),
      });

      console.log('got order: ' + JSON.stringify(order))

      const prov1 = window.ethereum
      if (!prov1) {
        throw Error('no window ethereum')
      }
      // const provider = new Web3(prov1).currentProvider;

      // if (!provider) {
      //   throw Error('no provider')
      // }

      // const signature = await order.getSignatureWithProviderAsync(new Web3Wrapper(useProviderResults as unknown as SupportedProvider) as unknown as SupportedProvider, SignatureType.EthSign, address)
      const signature = await order.getSignatureWithProviderAsync(useProviderResults as unknown as SupportedProvider)

      // alert(JSON.stringify(signature))

      if (!write) {
        throw Error('write undefined')
      }

      write({
        recklesslySetUnpreparedArgs: [
          [
            order.direction,
            order.maker,
            order.taker,
            order.expiry,
            order.nonce,
            order.erc20Token,
            order.erc20TokenAmount,
            0,
            order.erc721Token,
            order.erc721TokenId,
            0
          ], [
            signature.signatureType,
            signature.v,
            signature.r,
            signature.s
          ]
        ]
      })

    })()
    
  }


  return <>
    <h1 className='text-l'>Create offer</h1>
    <form onSubmit={createOffer}>
      <p>Direction (sell = 0, buy = 1)</p>
      <TextInput name='direction' />
      <p>WETH amount (in ETH)</p>
      <TextInput name='amount' />
      <p>ERC721 token address</p>
      <TextInput name='tokenAddr' value='0x03e055692e77e56abf7f5570d9c64c194ba15616' />
      <p>ERC721 token ID</p>
      <TextInput name='tokenId' value='2897' />
      <SubmitButton>Create offer</SubmitButton>

    </form>
  </>
}

export default function DAppPage() {
  return (
    <RequireWalletContainer>
      <Main />
    </RequireWalletContainer>
  )
}

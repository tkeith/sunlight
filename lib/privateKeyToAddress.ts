import { ethers } from "ethers";

export default function privateKeyToAddress(pkey: string) {
  return (new ethers.Wallet(pkey)).address
}

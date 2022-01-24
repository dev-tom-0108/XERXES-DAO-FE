import React from 'react';

import styled from 'styled-components'

import USDTLogo from '../../assets/tokensymbol/USDT@2x.png';
import BUSDLogo from '../../assets/tokensymbol/BUSD@2x.png'
import BUNNYLogo from '../../assets/tokensymbol/bunny@2x.png'
import BTCBLogo from '../../assets/tokensymbol/BTCB@2x.png'
import BNBLogo from '../../assets/tokensymbol/BNB@2x.png'
import BELTLogo from '../../assets/tokensymbol/BELT@2x.png'
import CAKELogo from '../../assets/tokensymbol/cake@2x.png'
import MDXLogo from '../../assets/tokensymbol/mdx@2x.png'
import BWSLogo from '../../assets/tokensymbol/BSW@2x.png'
import LINKLogo from '../../assets/tokensymbol/LINK@2x.png'
import XVSLogo from '../../assets/tokensymbol/XVS@2x.png'
import DOTLogo from '../../assets/tokensymbol/DOT@2x.png'
import UNILogo from '../../assets/tokensymbol/UNI@2x.png'
import LTCLogo from '../../assets/tokensymbol/LTC@2x.png'
import FILLogo from '../../assets/tokensymbol/FIL@2x.png'
import ADALogo from '../../assets/tokensymbol/ADA@2x.png'
import USTLogo from '../../assets/tokensymbol/UST@2x.png'
import VAILogo from '../../assets/tokensymbol/vai@2x.png'
import TUSDLogo from '../../assets/tokensymbol/TUSD@2x.png'
import MOBOXLogo from '../../assets/tokensymbol/mobox.png'
import ETHLogo from '../../assets/tokensymbol/ETH@2x.png';
import DAILogo from '../../assets/tokensymbol/DAI@2x.png'
import USDCLogo from '../../assets/tokensymbol/USDC@2x.png'
import PIDLogo from '../../assets/iconpid.png'
import sPIDLogo from '../../assets/iconspid.png'

import LpTokenSymbol from './LpTokenSymbol';

export const logosBySymbol: {[title: string]: string} = {
  'PID':PIDLogo,
  'sPID':sPIDLogo,
  'DAI':DAILogo,
  'USDC':USDCLogo,
  'USDT':USDTLogo,
  'BUSD':BUSDLogo,
  'BUNNY':BUNNYLogo,
  'BTCB':BTCBLogo,
  'BNB':BNBLogo,
  'WBNB':BNBLogo,
  'BELT':BELTLogo,
  "BSW":BWSLogo,
  'CAKE':CAKELogo,
  'ETH':ETHLogo,
  "MDX":MDXLogo,
  "LINK":LINKLogo,
  "XVS":XVSLogo,
  "DOT":DOTLogo,
  "UNI":UNILogo,
  "LTC":LTCLogo,
  "FIL":FILLogo,
  "ADA":ADALogo,
  "UST":USTLogo,
  "VAI":VAILogo,
  "TUSD":TUSDLogo,
  'MOBOX':MOBOXLogo
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
  msize?:number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 50,msize=size }) => {
  if(symbol.includes('-')){
    const tokens = symbol.split('-')
    return <LpTokenSymbol symbol1={tokens[0]} symbol2={tokens[1]} size={size} />
  }
  if (!logosBySymbol[symbol]) {
    // throw new Error(`Invalid RabbitLogo symbol: ${symbol}`);
    return <span>{symbol}</span>
  }
  return (
    <ImgBox
      src={logosBySymbol[symbol] || symbol}
      alt={`${symbol} Logo`}
      size={size}
      msize={msize}
    />
  )
};

export default TokenSymbol;


const ImgBox=styled.img<{size:number,msize:number}>`
  width:${props=>props.size}px;
  height:${props=>props.size}px;
  user-select:none;
  border-radius:50%;
  /* background-color:#fff; */
  @media (max-width: 1000px) {
      width:${props=>props.msize}px;
      height:${props=>props.msize}px;
  }
`
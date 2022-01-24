import React from 'react';
import TokenSymbol from './TokenSymbol';


type BasisLogoProps = {
  symbol1: string;
  symbol2:string;
  size?:number;
}

const TowSymbol: React.FC<BasisLogoProps> = ({ symbol1,symbol2, size = 50 }) => {

  return (
    <div style={{position:'relative',display:'flex'}}>
      <div style={{position:'relative',zIndex:1}}>
      <TokenSymbol symbol={symbol1} size={size}/>
      </div>
      <div style={{position:'relative',left:-size/3}}>
      <TokenSymbol symbol={symbol2} size={size}/>
      </div>
    </div>
  )
};

export default TowSymbol;

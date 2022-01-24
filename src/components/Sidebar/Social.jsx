import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import img1_1 from '../../assets/ohm/1-1.png';
import img1_2 from '../../assets/ohm/1-2.png';
import img1_3 from '../../assets/ohm/1-3.png';
import img1_4 from '../../assets/ohm/1-4.png';
import medium from '../../assets/ohm/med@2x.png';

export default function Social() {
  return (
    // <div className="social-row">
    //   <Link href="https://github.com/OlympusDAO" target="_blank">
    //     <SvgIcon color="primary" component={GitHub} />
    //   </Link>

    //   <Link href="https://olympusdao.medium.com/" target="_blank">
    //     <SvgIcon color="primary" component={Medium} />
    //   </Link>

    //   <Link href="https://twitter.com/OlympusDAO" target="_blank">
    //     <SvgIcon color="primary" component={Twitter} />
    //   </Link>

    //   <Link href="https://discord.gg/6QjjtUcfM4" target="_blank">
    //     <SvgIcon color="primary" component={Discord} />
    //   </Link>
    // </div>
    <div className="social-row " >
      <a href="https://twitter.com/PIDAOFinance" target="_blank" className="bottomImgs" style={{marginLeft:5,marginRight:15}}><img src={img1_1} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
      <a href="https://github.com/PIDAOFinance" target="_blank" className="bottomImgs" style={{marginLeft:15,marginRight:15}}><img src={img1_2} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
      <a href="https://medium.com/@PIDAOFinance" target="_blank" className="bottomImgs" style={{marginLeft:15,marginRight:15}}><img src={medium} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
      <a href="https://t.me/PIDAOfinance" target="_blank" className="bottomImgs" style={{marginLeft:15,marginRight:15}}><img src={img1_4} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
    </div>
  );
}

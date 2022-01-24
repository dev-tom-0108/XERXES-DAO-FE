import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import styled from 'styled-components';
// import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
// import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
// import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
// import { ReactComponent as OlympusIcon } from "../../assets/icons/olympus-nav-header.svg";
import { ReactComponent as xlogo } from "../../assets/ohm/xlogo.svg";
import { ReactComponent as PoolTogetherIcon } from "../../assets/icons/33-together.svg";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography as Typograp, SvgIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";
import LogoImg from '../../assets/ohm/logo@2x.png'
import Bondimg from '../../assets/ohm/bond@2x.png'
import Bondimg2 from '../../assets/ohm/bond2@2x.png'
import Dashboardimg from '../../assets/ohm/dashboard@2x.png'
import Dashboardimg2 from '../../assets/ohm/dashboard2@2x.png'
import Docsimg from '../../assets/ohm/docs@2x.png'
import Docsimg2 from '../../assets/ohm/docs2@2x.png'
import Stakeimg from '../../assets/ohm/stake@2x.png'
import Stakeimg2 from '../../assets/ohm/stake2@2x.png'

import Togetherimg from '../../assets/ohm/33-1@2x.png'
import Togetherimg2 from '../../assets/ohm/33@2x.png'

import NFTimg from '../../assets/ohm/nft-1@2x.png'
import NFTimg2 from '../../assets/ohm/nft@2x.png'





function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { bonds } = useBonds();
  const { chainID } = useWeb3Context();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true;
    }
    if (currentPath.indexOf("nft") >= 0 && page === "nft") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  const isActiveFc = useCallback((name) => {
    return checkPage(null, window.location, name)
  }, [window.location])
  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
          <Link href="https://app.hectordao.com" target="_blank">
              <SvgIcon
                id="header-nav-logo"
                color="primary"
                viewBox="0 0 151 100"
                component={xlogo}
                style={{ minWdth: "151px", minHeight: "98px", width: "151px" }}
              />
              {/* <div className="wallet-link f-32">Hector</div> */}
            </Link>
            {address && (
              <div className="wallet-link">
                <Link href={`https://ftmscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <ANavLink
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                bg2={Dashboardimg2}
              // className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6" className="fxCenter">
                  <ANavIcon bg1={Dashboardimg} />
                  Dashboard
                </Typography>
              </ANavLink>

              <ANavLink
                component={NavLink}
                id="stake-nav"
                to="/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                bg2={Stakeimg2}
              // className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6" className="fxCenter">
                  <ANavIcon bg1={Stakeimg} />
                  Stake
                </Typography>
              </ANavLink>
              

              {/* <ANavLink
                component={NavLink}
                id="33-together-nav"
                to="/33-together"
                isActive={(match, location) => {
                  return checkPage(match, location, "33-together");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={Togetherimg2}
              >
                <Typography variant="h6">
                  <ANavIcon bg1={Togetherimg} />
                  3,3 π
                </Typography>
              </ANavLink> */}
              {/* <ANavLink
                component={NavLink}
                id="nft"
                to="/nft"
                isActive={(match, location) => {
                  return checkPage(match, location, "nft");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                bg2={NFTimg2}
              >
                <Typography variant="h6">
                  <ANavIcon bg1={NFTimg} />
                  PINFT
                </Typography>
              </ANavLink> */}
              <ANavLink
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                bg2={Bondimg2}
              // className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6" className="fxCenter">
                  <ANavIcon bg1={Bondimg} />
                  Bond
                </Typography>
              </ANavLink>



              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Typography variant="body2">Bond discounts</Typography>
                  {bonds.map((bond, i) => (
                    <ANavLink component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                      {!bond.bondDiscount ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : (
                        <Typography variant="body2">
                          {bond.displayName}
                          <span className="bond-pair-roi">
                            {bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%
                          </span>
                        </Typography>
                      )}
                    </ANavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <ANavLink key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography variant="h6">{externalUrls[link].icon}</Typography>
                  <Typography variant="h6">{externalUrls[link].title}</Typography>
                </ANavLink>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;



const ANavIcon = styled.div`
  width:20px;
  height: 20px;
  background-image: url(${props => props.bg1});
  background-size: 100%;
  margin-right:12px;
`

const ANavLink = styled(Link)`
  &:hover,&.active{
    text-decoration:none;
    h6{
    color:#ffe300;
    }
    ${ANavIcon}{
      background-image: url(${props => props.bg2});
    }
  }
`

const Typography = styled(Typograp)`
  display: flex;
  align-items: center;
`

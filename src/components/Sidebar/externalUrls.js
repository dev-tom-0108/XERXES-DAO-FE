import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as FeedbackIcon } from "../../assets/icons/feedback.svg";
import {  SvgIcon } from "@material-ui/core";
import styled from "styled-components";

const externalUrls = [
  // {
  //   title: "Feedback",
  //   url: "",
  //   icon: <SvgIcon color="primary" component={ForumIcon} />,
  // },
  {
    title: "Governance",
    url: "https://pidao.gitbook.io/homepage/community/governance",
    icon: <SvgIcon color="primary" component={GovIcon} />,
  },
  {
    title: "Docs",
    url: "https://pidao.gitbook.io/homepage/",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
  {
    title: "Feedback",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScnaNowC-y5Yj9QET3j67aqpKN6FWFAit973ICQzAsERaVw0w/viewform",
    icon: <SvgIcon color="primary" component={FeedbackIcon} />,
  }
];

export default externalUrls;

const IconImg1 = styled.img`

`
const IconImg2 = styled.img`

`
const IconImg3 = styled.img`

`
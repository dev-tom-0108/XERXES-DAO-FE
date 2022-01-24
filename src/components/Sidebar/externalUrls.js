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
    title: "Docs",
    url: "https://",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
  {
    title: "Governance",
    url: "https://",
    icon: <SvgIcon color="primary" component={GovIcon} />,
  },
 
];

export default externalUrls;

const IconImg1 = styled.img`

`
const IconImg2 = styled.img`

`
const IconImg3 = styled.img`

`
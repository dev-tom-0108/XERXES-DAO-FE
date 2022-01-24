import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as OlympusStaking } from "../abi/OlympusStakingv2.json";
import IDOABI from "../abi/ido.json";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./PendingTxnsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { error } from "../slices/MessagesSlice";
import { IActionValueAsyncThunk, IChangeApprovalAsyncThunk, IJsonRPCError } from "./interfaces";
import { segmentUA } from "../helpers/userAnalyticHelpers";

interface IUAData {
  address: string;
  value: string;
  approved: boolean;
  txHash: string | null;
  type: string | null;
}
export const searchUserBanle=createAsyncThunk(
  "ido/search",
  async ({ token, provider, address, networkID }: IChangeApprovalAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();
    const stakingIDO = new ethers.Contract(
      addresses[networkID].IDO_ADDRESS as string,
      IDOABI,
      signer,
    );
    const balanceVal = await stakingIDO.Whitelist(address)
    console.error(balanceVal);
    
  }
)
export const changeApproval = createAsyncThunk(
  "ido/changeApproval",
  async ({ token, provider, address, networkID }: IChangeApprovalAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();
    const idoContract = new ethers.Contract(addresses[networkID].BUSD_ADDRESS as string, ierc20Abi, signer);
    let approveTx;
    try {
      console.error(idoContract)
      console.error(addresses[networkID].IDO_ADDRESS)
      approveTx = await idoContract.approve(
        addresses[networkID].IDO_ADDRESS,
        ethers.utils.parseUnits("1000000000000000000000000", "gwei").toString(),
      );
      const text = "Approve";
      const pendingTxnType = "approve_staking";
      dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text, type: pendingTxnType }));
      await approveTx.wait();
    } catch (e: unknown) {
      dispatch(error((e as IJsonRPCError).message));
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
    // const stakeAllowance = await idoContract.allowance(address, addresses[networkID].BUSD_ADDRESS);

    const iodContract = new ethers.Contract(addresses[networkID].IDO_ADDRESS as string, IDOABI, provider);
    const idoBalance = (await iodContract.Whitelist(address)).toNumber() / 1e9 
    const busdAmount = ethers.utils.formatUnits(await iodContract.getBusdAmount(address))
    const busdContract = new ethers.Contract(addresses[networkID].BUSD_ADDRESS as string, ierc20Abi, provider);
    const idoAllowance = await busdContract.allowance(address, iodContract.address);
    const IsPay = await iodContract.IsPay(address)
    const IsOpen= await iodContract.IsOpen()

    console.error( {
      idoBalance,
      idoAllowance,
      IsPay,
      IsOpen,
      busdAmount 
    }
  )
    return dispatch(
      fetchAccountSuccess({
        ido: {
          idoBalance,
          idoAllowance,
          IsPay,
          IsOpen,
          busdAmount 
        },
      }),
    );
  },
);

export const changeStake = createAsyncThunk(
  "ido/changeStake",
  async ({ action, provider, address, networkID }: IActionValueAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    const signer = provider.getSigner();
    const stakingIDO = new ethers.Contract(
      addresses[networkID].IDO_ADDRESS as string,
      IDOABI,
      signer,
    );

    let stakeTx;
    let uaData: IUAData = {
      address: address,
      value: '',
      approved: true,
      txHash: null,
      type: null,
    };
    try {
      uaData.type = "stake";
      stakeTx = await stakingIDO.buy();
      const pendingTxnType = action === "stake" ? "staking" : "unstaking";
      uaData.txHash = stakeTx.hash;
      dispatch(fetchPendingTxns({ txnHash: stakeTx.hash, text: getStakingTypeText(action), type: pendingTxnType }));
      await stakeTx.wait();
    } catch (e: unknown) {
      uaData.approved = false;
      const rpcError = e as IJsonRPCError;
      if (rpcError.code === -32603 && rpcError.message.indexOf("ds-math-sub-underflow") >= 0) {
        dispatch(
          error("You may be trying to stake more than your balance! Error code: 32603. Message: ds-math-sub-underflow"),
        );
      } else {
        dispatch(error(rpcError.message));
      }
      return;
    } finally {
      if (stakeTx) {
        dispatch(clearPendingTxn(stakeTx.hash));
      }
    }
    dispatch(getBalances({ address, networkID, provider }));
  },
);

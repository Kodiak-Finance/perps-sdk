import {
  Message,
  RegisterAccountInputs,
  WithdrawInputs,
  WalletAdapter,
  SettleInputs,
  AddOrderlyKeyInputs,
} from "./walletAdapter";
import { ChainNamespace } from "../constants";
import { API, SDKError } from "@orderly.network/types";
import * as ed from "@noble/ed25519";
import { encode as bs58encode, decode as bs58Decode } from "bs58";
import { IContract } from "../contract";
import { SignatureDomain } from "../utils";
import { ethers } from "ethers";
import type { BigNumberish } from "ethers/src.ts/utils";

abstract class BaseWalletAdapter<Config> implements WalletAdapter<Config> {
  // private readonly contractManager: ContractManager;

  abstract generateRegisterAccountMessage(
    inputs: RegisterAccountInputs
  ): Promise<Message>;

  abstract generateWithdrawMessage(
    inputs: WithdrawInputs
  ): Promise<Message & { domain: SignatureDomain }>;

  abstract generateSettleMessage(
    inputs: SettleInputs
  ): Promise<Message & { domain: SignatureDomain }>;

  abstract generateAddOrderlyKeyMessage(
    inputs: AddOrderlyKeyInputs
  ): Promise<Message>;

  abstract getBalance(): Promise<bigint>;

  abstract chainNamespace: ChainNamespace;

  abstract call(
    address: string,
    method: string,
    params: any[],
    options?: {
      abi: any;
    }
  ): Promise<any>;

  abstract sendTransaction(
    contractAddress: string,
    method: string,
    payload: {
      from: string;
      to?: string;
      data: any[];
      value?: bigint;
    },
    options: {
      abi: any;
    }
  ): Promise<any>;

  abstract callOnChain(
    chain: API.NetworkInfos,
    address: string,
    method: string,
    params: any[],
    options: {
      abi: any;
    }
  ): Promise<any>;

  get address(): string {
    throw new SDKError("Method not implemented.");
  }

  get chainId(): number {
    throw new SDKError("Method not implemented.");
  }

  active(config: Config): void {
    throw new SDKError("Method not implemented.");
  }

  abstract deactivate(): void;

  update(config: Config): void {
    throw new SDKError("Method not implemented.");
  }

  generateSecretKey(): string {
    let privateKey, secretKey;
    do {
      privateKey = ed.utils.randomPrivateKey();
      secretKey = bs58encode(privateKey);
    } while (secretKey.length !== 44);

    return secretKey;
  }

  parseUnits(amount: string, decimals = 6) {
    return ethers.parseUnits(amount, decimals).toString();
  }

  formatUnits(amount: BigNumberish, decimals = 6) {
    return ethers.formatUnits(amount, decimals);
  }

  on(eventName: string, listener: (...args: any[]) => void): void {
    throw new SDKError("Method not implemented.");
  }

  off(eventName: string, listener: (...args: any[]) => void): void {
    throw new SDKError("Method not implemented.");
  }

  abstract pollTransactionReceiptWithBackoff(
    txHash: string,
    baseInterval?: number,
    maxInterval?: number,
    maxRetries?: number
  ): Promise<any>;
}

export { BaseWalletAdapter };


export enum TypeWalletStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
};
export interface Wallet {
  walletId: string;
  name: string;
  balance: number;
  blockedBalance: number;
  currency: string;
  status: TypeWalletStatus;
  version: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
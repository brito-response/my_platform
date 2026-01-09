import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { TypeWalletStatus, Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletRepository } from './repository/wallet.repository';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiError } from 'src/common/errors/api.error';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { JobService } from '../job/job.service';
import { JobfrellasService } from '../jobfrellas/jobfrellas.service';

@Injectable()
export class WalletService extends BaseService<Wallet, CreateWalletDto, UpdateWalletDto> {
  constructor(private readonly walletRepository: WalletRepository,
    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,
    private readonly jobFreelancerService: JobfrellasService, private readonly sequelize: Sequelize) {
    super(walletRepository);
  }

  async finByUserId(userId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneByUserId(userId);
    if (!wallet) throw new ApiError("this wallet nor found", 404);
    return wallet;
  }

  async subtractValueTransaction(userId: string, amount: number, transaction: Transaction): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneByUserId(userId, transaction);

    if (!wallet) throw new ApiError('Wallet not found', 404);
    if (wallet.status !== TypeWalletStatus.ACTIVE) throw new ApiError('Wallet is not active', 403);
    if (Number(wallet.balance) < amount) throw new ApiError('Insufficient balance', 400);

    const newBalance = Number(wallet.balance) - amount;
    const [affected, [updatedWallet]] = await this.walletRepository.updateWithTransaction(wallet.walletId, { balance: newBalance, version: wallet.version + 1, }, transaction);

    if (!affected) throw new ApiError('Wallet update conflict', 409);

    return updatedWallet;
  }

  async subtractBlockedBalance(userId: string, amount: number, transaction: Transaction): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneByUserId(userId, transaction);

    if (!wallet) throw new ApiError('Wallet not found', 404);
    if (wallet.status !== TypeWalletStatus.ACTIVE) throw new ApiError('Wallet is not active', 403);
    if (Number(wallet.blockedBalance) < amount) throw new ApiError('Insufficient blocked balance', 400);

    const newBlockedBalance = Number(wallet.blockedBalance) - amount;
    const [affected, [updatedWallet]] = await this.walletRepository.updateWithTransaction(wallet.walletId, { blockedBalance: newBlockedBalance, version: wallet.version + 1 }, transaction);

    if (!affected) throw new ApiError('Wallet update conflict', 409);
    return updatedWallet;
  }

  async addBalance(userId: string, amount: number, transaction: Transaction): Promise<Wallet> {

    const wallet = await this.walletRepository.findOneByUserId(userId, transaction);

    if (!wallet) throw new ApiError('Wallet not found', 404);
    if (wallet.status !== TypeWalletStatus.ACTIVE) throw new ApiError('Wallet is not active', 403);

    const newBalance = Number(wallet.balance) + amount;

    const [affected, [updatedWallet]] = await this.walletRepository.updateWithTransaction(wallet.walletId, { balance: newBalance, version: wallet.version + 1, }, transaction);

    if (!affected) throw new ApiError('Wallet update conflict', 409);
    return updatedWallet;
  }

  async transferBlockedToBalance(payerId: string, receiverId: string, amount: number, transaction: Transaction) {
    await this.subtractBlockedBalance(payerId, amount, transaction);
    await this.addBalance(receiverId, amount, transaction);
  }

  // async payFreelancers(jobId: string) {
  //   const transaction = await this.sequelize.transaction();

  //   try {
  //     const job = await this.jobService.getByIdWithTransaction(jobId, transaction);
  //     if (job.status !== StatusJob.COMPLETED) throw new ApiError('Job not completed', 400);
  //     const jobFreelancers = await this.jobFreelancerService.getByIdWithTransaction(jobId, transaction);

  //     for (const jf of jobFreelancers) {
  //       if (jf.status === 'PAID') continue;
  //       await this.walletService.transferBlockedToBalance(job.userId, jf.freelancerId, jf.amountToReceive, transaction);
  //       await this.jobFreelancerRepository.update(jf.id, { status: 'PAID' }, transaction);
  //     }

  //     await this.jobRepository.update(jobId, { status: StatusJob.COMPLETED }, transaction);

  //     await transaction.commit();
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw error;
  //   }
  // }
}

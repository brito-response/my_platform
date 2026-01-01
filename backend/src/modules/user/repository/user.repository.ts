import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { TypeUser, User } from "../entities/user.entity";
import { InjectModel } from "@nestjs/sequelize";
import { col, fn, InferCreationAttributes, Sequelize } from "sequelize";
import { Contract } from "src/modules/contract/entities/contract.entity";
import { Job } from "src/modules/job/entities/job.entity";
import { CityStats, StateStats, UsersData } from "../utils/dto/user-report.dto";
import { Proposal } from "src/modules/proposal/entities/proposal.entity";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectModel(User) private readonly usuarioModel: typeof User) {
        super(usuarioModel);
    }

    async criar(data: InferCreationAttributes<User>): Promise<User> {
        return await this.create(data);
    }

    async buscarPorEmail(email: string): Promise<User | null> {
        return this.usuarioModel.findOne({ where: { email } });
    }

    async buscarTodos(): Promise<User[]> {
        return this.findAll();
    }

    async buscarPorTipo(tipo: TypeUser): Promise<User[]> {
        return await this.usuarioModel.findAll({ where: { typeuser: tipo } });
    }

    async updatePassword(id: string, hashedPassword: string): Promise<[number, User[]]> {
        return this.update(id, { password: hashedPassword });
    }

    async buscarJobsDoUsuario(userId: string): Promise<Job[]> {
        const user = await this.usuarioModel.findByPk(userId, {
            include: [{ model: Job }],
        });

        return user?.jobs ?? [];
    }

    async buscarContratosDoUsuario(userId: string): Promise<Contract[]> {
        const user = await this.usuarioModel.findByPk(userId, {
            include: [{ model: Contract }],
        });

        return user?.contracts ?? [];
    }

    async findById(userId: string): Promise<Partial<User> | null> {
        const user = await this.usuarioModel.findByPk(userId);
        if (!user) return null;
        return user.get({ plain: true }) as Partial<User>;
    }

    async getInstanceOfUserById(id: string): Promise<User | null> {
        return await this.usuarioModel.findByPk(id);
    }

    async findAllUsersData(): Promise<UsersData> {
        const sequelize = this.usuarioModel.sequelize as Sequelize;
        // Total de usuários
        const totalUsers = await this.usuarioModel.count();
        // Usuários por cidade
        const usersByCity = await this.usuarioModel.findAll({ attributes: ["city", [fn("COUNT", col("city")), "count"],], group: ["city"], raw: true }) as unknown as CityStats[];
        // Usuários por estado
        const usersByState = await this.usuarioModel.findAll({ attributes: ["state", [fn("COUNT", col("state")), "count"]], group: ["state"], raw: true }) as unknown as StateStats[];
        // Média de valor/hora
        const avgHourlyResult = await this.usuarioModel.findOne({ attributes: [[fn("AVG", col("hourly_rate")), "averageHourlyRate"]], raw: true });
        const averageHourlyRate = Number(avgHourlyResult?.["averageHourlyRate"] ?? 0);

        //  Média de score
        const avgScoreResult = await this.usuarioModel.findOne({ attributes: [[fn("AVG", col("score")), "averageScore"]], raw: true });
        const averageScore = Number(avgScoreResult?.["averageScore"] ?? 0);

        //  Média de proposals por usuário
        const totalProposals = await Proposal.count();
        const averageProposalsPerUser = totalUsers > 0 ? totalProposals / totalUsers : 0;
        return { totalUsers, usersByCity, usersByState, averageHourlyRate, averageScore, averageProposalsPerUser } as UsersData;
    }

}
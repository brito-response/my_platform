import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Message } from "../entities/message.entity";
import { UserMessage } from "../entities/usuariomessage.entity";
import { Op } from "sequelize";

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
    constructor(@InjectModel(Message) private readonly messageModel: typeof Message, @InjectModel(UserMessage) private readonly userMessageModel: typeof UserMessage,) {
        super(messageModel);
    }

    async findConversation(user1Id: string, user2Id: string): Promise<Message[]> {
        const user1Messages = await this.userMessageModel.findAll({ where: { userId: user1Id } });
        const user2Messages = await this.userMessageModel.findAll({ where: { userId: user2Id } });

        const messageIdsUser1 = user1Messages.map((m) => m.messageId);
        const messageIdsUser2 = user2Messages.map((m) => m.messageId);

        const sharedMessageIds = messageIdsUser1.filter((id) => messageIdsUser2.includes(id));

        return this.messageModel.findAll({
            where: { messageId: { [Op.in]: sharedMessageIds } },
            order: [['createdAt', 'ASC']],
        });
    }

    async createMessageWithUsers(senderId: string, receiverId: string, content: string, file?: string) {
        const message = await this.messageModel.create({ content, file: file ?? null });

        // cria os vínculos na tabela pivô
        await this.userMessageModel.bulkCreate([
            { userId: senderId, messageId: message.messageId },
            { userId: receiverId, messageId: message.messageId },
        ]);

        return message;
    }
}
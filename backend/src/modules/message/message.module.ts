import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageRepository } from './repository/message.repository';
import { UserMessage } from './entities/usuariomessage.entity';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Message, UserMessage])],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, ChatGateway],
})
export class MessageModule { }

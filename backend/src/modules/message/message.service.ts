import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageRepository } from './repository/message.repository';
import { BaseService } from 'src/common/base/base.service';
import { Message } from './entities/message.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ResponseMessage } from './dto/response-message.dto';

@Injectable()
export class MessageService extends BaseService<Message, CreateMessageDto, UpdateMessageDto, ResponseMessage> {
  constructor(private readonly messageRepository: MessageRepository) {
    super(messageRepository, (message) => message.toJSON());
  }

  async getConversation(user1Id: string, user2Id: string): Promise<Message[]> {
    return this.messageRepository.findConversation(user1Id, user2Id);
  }

  async sendMessage(dto: CreateMessageDto): Promise<Message> {
    return this.messageRepository.createMessageWithUsers(dto.senderId, dto.receiverId, dto.content, dto.file);
  }

}

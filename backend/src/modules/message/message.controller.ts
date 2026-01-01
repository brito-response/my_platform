import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.messageService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return await this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messageService.remove(id);
  }
  @Get('conversation/:user1Id/:user2Id')
  async getConversation(@Param('user1Id') u1: string, @Param('user2Id') u2: string) {
    return await this.messageService.getConversation(u1, u2);
  }

  @Post('send')
  async sendMessage(@Body() dto: CreateMessageDto) {
    return await this.messageService.sendMessage(dto);
  }
}

import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  constructor(private readonly messageService: MessageService) { }

  private onlineUsers = new Map<string, string>(); // userId -> socket.id

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.onlineUsers.entries()].find(([_, socketId]) => socketId === client.id)?.[0];
    if (userId) this.onlineUsers.delete(userId);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('registerUser')
  handleRegisterUser(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.onlineUsers.set(data.userId, client.id);
    console.log(`User ${data.userId} conectado com socket ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: { senderId: string; receiverId: string; content: string; file?: string }) {
    // salva no banco
    const message = await this.messageService.sendMessage(data);

    // busca conversa atualizada
    const conversation = await this.messageService.getConversation(data.senderId, data.receiverId);

    // envia conversa atualizada pros dois
    const receiverSocket = this.onlineUsers.get(data.receiverId);
    const senderSocket = this.onlineUsers.get(data.senderId);

    if (receiverSocket) {
      this.server.to(receiverSocket).emit('conversationUpdated', conversation);
    }

    if (senderSocket) {
      this.server.to(senderSocket).emit('conversationUpdated', conversation);
    }

    return message;
  }

  @SubscribeMessage('getConversation')
  async handleGetConversation(@MessageBody() data: { user1Id: string; user2Id: string }, @ConnectedSocket() client: Socket) {
    const conversation = await this.messageService.getConversation(data.user1Id, data.user2Id);
    client.emit('conversationData', conversation);
  }
}

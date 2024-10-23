export class Message {
    messageId?: string;
    content: string;
    userId?: string;
    username: string;
  
    constructor(content: string, username: string, messageId?: string, userId?: string) {
      this.messageId = messageId;
      this.content = content; 
      this.userId = userId;
      this.username = username; 
  
    }
  }
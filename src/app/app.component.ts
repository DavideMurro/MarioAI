import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { Message } from './models/message.model';
import { MessageDirectionEnum } from './enums/message-direction-enum';
import { TranslateService } from '@ngx-translate/core';
import { AppStore } from './stores/app.store';
import { Chat } from './models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public chat: Chat;

  constructor(
    private store: AppStore,
    private chatService: ChatService,
    private translate: TranslateService
  ) {
    this.chat = this.store.chat;
  }

  ngOnInit(): void {
    this.initChat();
  }

  private initChat() {
    // welcome message
    let message: Message = {
      sendingDate: new Date(),
      direction: MessageDirectionEnum.response,
      text: this.translate.instant('WELCOME_MESSAGE'),
    };
    this.chat.messages.unshift(message);

    // check connection
    this.chatService.testConnection().subscribe({
      error: (error: any) => {
        console.error(error);
        let message: Message = {
          sendingDate: new Date(),
          direction: MessageDirectionEnum.response,
          isError: true,
          text: this.translate.instant('NO_CONNECTION_MESSAGE'),
        };
        this.chat.messages.unshift(message);
      },
    });
  }
}

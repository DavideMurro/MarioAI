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
    this.translate.get('WELCOME_MESSAGE').subscribe((res: string) => {
      let message: Message = {
        sendingDate: new Date(),
        direction: MessageDirectionEnum.response,
        text: res,
      };
      this.chat.messages.unshift(message);
    });

    // check connection
    this.chatService.testConnection().subscribe({
      error: (error: any) => {
        console.error(error);
        this.translate.get('NO_CONNECTION_MESSAGE').subscribe((res: string) => {
          let message: Message = {
            sendingDate: new Date(),
            direction: MessageDirectionEnum.response,
            isError: true,
            text: res,
          };
          this.chat.messages.unshift(message);
        });
      },
    });
  }
}

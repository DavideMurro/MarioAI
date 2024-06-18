import { Component, OnInit } from '@angular/core';
import { Message } from './models/message.model';
import { MessageDirectionEnum } from './enums/message-direction-enum';
import { TranslateService } from '@ngx-translate/core';
import { AppStore } from './stores/app.store';
import { Chat } from './models/chat.model';
import { MessageTypeEnum } from './enums/message-type-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public chat: Chat;

  constructor(private store: AppStore, private translate: TranslateService) {
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
      type: MessageTypeEnum.text,
      text: this.translate.instant('WELCOME_MESSAGE'),
    };
    this.chat.messages.unshift(message);
  }
}

import { Component, Input } from '@angular/core';
import { MessageDirectionEnum } from 'src/app/enums/message-direction-enum';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  @Input() chat!: Chat;
  public messageDirectionEnum = MessageDirectionEnum;
}

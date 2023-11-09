import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chat } from './models/chat.model';
import { Message } from './models/message.model';
import { MessageDirectionEnum } from './enums/message-direction-enum';
import { defer } from 'rxjs';
import { TextToImageResponse } from './models/text-to-image-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appTitle: string = 'MarioAI';
  public chatForm: FormGroup = new FormGroup({
    requestMessage: new FormControl('', Validators.required),
  });
  public chat: Chat = { messages: [] };

  constructor(private chatService: ChatService) {}

  public onChatFormSubmit() {
    let requestMessageText: string = this.chatForm.get('requestMessage')?.value;
    this.chatForm.get('requestMessage')?.reset();

    if (requestMessageText) {
      let requestMessage: Message = {
        sendingDate: new Date(),
        direction: MessageDirectionEnum.request,
        text: requestMessageText,
      };
      let responseMessage: Message;

      this.chat.messages.unshift(requestMessage);

      defer(() => {
        responseMessage = {
          direction: MessageDirectionEnum.response,
          isLoading: true,
        };
        this.chat.messages.unshift(responseMessage);

        return this.chatService.sendMessage(requestMessageText);
      }).subscribe({
        next: (response: TextToImageResponse) => {
          responseMessage.isLoading = false;
          responseMessage.sendingDate = new Date();
          responseMessage.image = response.images[0];
        },
        error: (error: any) => {
          console.error(error);
          responseMessage.isLoading = false;
          responseMessage.isError = true;
        },
        /*complete: () => {
          console.log('completato zio chen');
        },*/
      });
    }
  }
}

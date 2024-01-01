import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer } from 'rxjs';
import { MessageDirectionEnum } from 'src/app/enums/message-direction-enum';
import { Chat } from 'src/app/models/chat.model';
import { Message } from 'src/app/models/message.model';
import { TextToImageResponse } from 'src/app/models/text-to-image-response.model';
import { ChatService } from 'src/app/services/chat.service';
import { AppStore } from 'src/app/stores/app.store';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  public chat: Chat;
  public chatForm: FormGroup;

  constructor(
    private store: AppStore,
    private translate: TranslateService,
    private chatService: ChatService
  ) {
    this.chat = this.store.chat;
    this.chatForm = new FormGroup({
      requestMessage: new FormControl('', [Validators.maxLength(150)]),
    });
  }

  public onChatFormSubmit() {
    let requestMessageText: string = this.chatForm.get('requestMessage')?.value;

    //reset
    this.chatForm.get('requestMessage')?.reset();
    // remove any focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // send message
    if (requestMessageText) {
      let requestMessage: Message;
      let responseMessage: Message;

      // request
      requestMessage = {
        sendingDate: new Date(),
        direction: MessageDirectionEnum.request,
        text: requestMessageText,
      };
      this.chat.messages.unshift(requestMessage);

      // response
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
          if (response?.images?.length > 0) {
            response.images.forEach((image, index) => {
              if (index === 0) {
                responseMessage.image = image;
              } else {
                // insert other messages after the first one
                let indexOfResponseMessage = this.chat.messages.findIndex(
                  (x) => x === responseMessage
                );
                let nextResponseMessage = {
                  direction: MessageDirectionEnum.response,
                  image: image,
                };
                this.chat.messages.splice(
                  indexOfResponseMessage - (index - 1),
                  0,
                  nextResponseMessage
                );
              }
            });
          } else {
            responseMessage.text = this.translate.instant('NO_IMAGES');
            responseMessage.isError = true;
          }
        },
        error: (error: any) => {
          console.error(error);
          responseMessage.isLoading = false;
          responseMessage.sendingDate = new Date();
          responseMessage.text = this.translate.instant('ERROR_MESSAGE');
          responseMessage.isError = true;
        },
      });
    }
  }
}

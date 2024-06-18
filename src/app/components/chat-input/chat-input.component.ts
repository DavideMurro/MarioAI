import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer } from 'rxjs';
import { MessageDirectionEnum } from 'src/app/enums/message-direction-enum';
import { MessageTypeEnum } from 'src/app/enums/message-type-enum';
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
  public messageTypeEnum = MessageTypeEnum;

  constructor(
    private store: AppStore,
    private translate: TranslateService,
    private chatService: ChatService
  ) {
    this.chat = this.store.chat;
    this.chatForm = new FormGroup({
      requestMessageText: new FormControl('', [
        //Validators.required,
        Validators.maxLength(150),
      ]),
      responseMessageType: new FormControl(MessageTypeEnum.text, [
        //Validators.required,
      ]),
    });
  }

  public async onChatFormSubmit() {
    let requestMessageText: string =
      this.chatForm.get('requestMessageText')?.value;
    let responseMessageType: MessageTypeEnum = this.chatForm.get(
      'responseMessageType'
    )?.value;

    // reset
    this.chatForm.get('requestMessageText')?.reset();
    /*
    this.chatForm.get('requestMessageText')?.markAsPristine();
    this.chatForm.get('requestMessageText')?.markAsUntouched();
    this.chatForm.get('requestMessageText')?.updateValueAndValidity();
    this.chatForm.get('requestMessageText')?.markAsPending(); // this fix the problem of validity when it resets
    */
    // remove any focus (this fix keeping focus on mobile)
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
        type: MessageTypeEnum.text,
        text: requestMessageText,
      };
      this.chat.messages.unshift(requestMessage);

      // response
      if (responseMessageType === MessageTypeEnum.text) {
        defer(() => {
          responseMessage = {
            direction: MessageDirectionEnum.response,
            isLoading: true,
            type: responseMessageType,
          };
          this.chat.messages.unshift(responseMessage);

          return this.chatService.sendMessageToText(requestMessageText);
        }).subscribe({
          next: (response: string) => {
            responseMessage.isLoading = false;
            responseMessage.sendingDate = new Date();
            if (response) {
              responseMessage.text = response;
            } else {
              responseMessage.text = this.translate.instant('NO_MASSAGE');
              responseMessage.isError = true;
            }
          },
          error: (error: any) => {
            console.error(error);
            responseMessage.isLoading = false;
            responseMessage.sendingDate = new Date();
            responseMessage.text = this.translate.instant(
              'CONNECTION_ERROR_MESSAGE'
            );
            responseMessage.isError = true;
          },
        });
      } else if (responseMessageType === MessageTypeEnum.image) {
        defer(() => {
          responseMessage = {
            direction: MessageDirectionEnum.response,
            isLoading: true,
            type: responseMessageType,
          };
          this.chat.messages.unshift(responseMessage);

          return this.chatService.sendMessageToImage(requestMessageText);
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
                  let nextResponseMessage: Message = {
                    direction: MessageDirectionEnum.response,
                    type: responseMessageType,
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
            responseMessage.text = this.translate.instant(
              'CONNECTION_ERROR_MESSAGE'
            );
            responseMessage.isError = true;
          },
        });
      }
    }
  }
}

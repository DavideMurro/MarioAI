import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chat } from './models/chat.model';
import { Message } from './models/message.model';
import { MessageDirectionEnum } from './enums/message-direction-enum';
import { defer } from 'rxjs';
import { TextToImageResponse } from './models/text-to-image-response.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public appTitle: string = 'MarioAI';
  public chatForm: FormGroup;
  public chat: Chat;

  constructor(
    private chatService: ChatService,
    private translate: TranslateService
  ) {
    this.chatForm = new FormGroup({
      requestMessage: new FormControl('', [Validators.maxLength(75)]),
    });
    this.chat = { messages: [] };
  }
  ngOnInit(): void {
    this.initChat();
  }

  public initChat() {
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

  public onChatFormSubmit() {
    let requestMessageText: string = this.chatForm.get('requestMessage')?.value;
    this.chatForm.get('requestMessage')?.reset();
    // remove any focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

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
            // TODO: inserire tutte le immagini in 1 solo messaggio
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
            this.translate.get('NO_IMAGES').subscribe((res: string) => {
              responseMessage.text = res;
              responseMessage.isError = true;
            });
          }
        },
        error: (error: any) => {
          console.error(error);
          responseMessage.isLoading = false;
          this.translate.get('ERROR_MESSAGE').subscribe((res: string) => {
            responseMessage.text = res;
            responseMessage.isError = true;
          });
        },
      });
    }
  }
}

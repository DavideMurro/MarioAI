import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppHeader } from 'src/app/models/app-header.model';
import { AppStore } from 'src/app/stores/app.store';
import { LanguageSelectorDialogComponent } from '../language-selector-dialog/language-selector-dialog.component';
import { ApiUrlsInputDialogComponent } from '../api-urls-input-dialog/api-urls-input-dialog.component';
import { ChatService } from 'src/app/services/chat.service';
import { MessageDirectionEnum } from 'src/app/enums/message-direction-enum';
import { Message } from 'src/app/models/message.model';
import { TranslateService } from '@ngx-translate/core';
import { Chat } from 'src/app/models/chat.model';
import { defer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public appHeader: AppHeader;
  public chat: Chat;

  constructor(
    private store: AppStore,
    private translate: TranslateService,
    private chatService: ChatService,
    private dialog: MatDialog
  ) {
    this.appHeader = this.store.appHeader;
    this.chat = this.store.chat;
  }

  public onLanguageSelect() {
    this.dialog
      .open(LanguageSelectorDialogComponent, {
        data: {
          currentLanguageCode: this.store.appHeader.currentLanguageCode,
          languages: this.store.appHeader.languages,
        },
        width: '600px',
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.store.setLanguage(result.currentLanguageCode);

          // send message
          this.translate
            .get('EDIT_LANGUAGE_MESSAGE')
            .subscribe((res: string) => {
              let responseMessage = {
                direction: MessageDirectionEnum.response,
                sendingDate: new Date(),
                text: res,
              };
              this.chat.messages.unshift(responseMessage);
            });
        }
      });
  }
  public onApiUrlsSelect() {
    this.dialog
      .open(ApiUrlsInputDialogComponent, {
        data: {
          currentStableDiffusionApiUrl:
            this.store.appHeader.currentStableDiffusionApiUrl,
        },
        width: '600px',
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.store.setApiUrls(result);

          // send message
          let responseMessage: Message;
          defer(() => {
            responseMessage = {
              direction: MessageDirectionEnum.response,
              isLoading: true,
            };
            this.chat.messages.unshift(responseMessage);

            return this.chatService.testConnection();
          }).subscribe({
            next: (result: any) => {
              this.translate
                .get('EDIT_API_URL_SUCCESS_MESSAGE')
                .subscribe((res: string) => {
                  responseMessage.sendingDate = new Date();
                  responseMessage.text = res;
                  responseMessage.isLoading = false;
                });
            },
            error: (error: any) => {
              console.error(error);
              this.translate
                .get('EDIT_API_URL_ERROR_MESSAGE')
                .subscribe((res: string) => {
                  responseMessage.sendingDate = new Date();
                  responseMessage.isError = true;
                  responseMessage.text = res;
                  responseMessage.isLoading = false;
                });
            },
          });
        }
      });
  }
}

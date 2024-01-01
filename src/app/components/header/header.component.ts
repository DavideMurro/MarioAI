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
import { ApiUrlsData } from 'src/app/models/api-urls-data.model';

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
          selectedLanguageCode: this.store.appHeader.currentLanguageCode,
          languages: this.store.appHeader.languages,
        },
        width: '600px',
      })
      .afterClosed()
      .subscribe((result: string) => {
        if (result) {
          this.store.setLanguage(result).subscribe(() => {
            // send message
            let responseMessage = {
              direction: MessageDirectionEnum.response,
              sendingDate: new Date(),
              text: this.translate.instant('EDIT_LANGUAGE_MESSAGE'),
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
          stableDiffusionApiUrl:
            this.store.appHeader.currentStableDiffusionApiUrl,
        },
        width: '600px',
      })
      .afterClosed()
      .subscribe((result: ApiUrlsData) => {
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
            next: (result: boolean) => {
              responseMessage.sendingDate = new Date();
              responseMessage.text = this.translate.instant(
                'EDIT_API_URL_SUCCESS_MESSAGE'
              );
              responseMessage.isLoading = false;
            },
            error: (error: any) => {
              console.error(error);
              responseMessage.sendingDate = new Date();
              responseMessage.isError = true;
              responseMessage.text = this.translate.instant(
                'EDIT_API_URL_ERROR_MESSAGE'
              );
              responseMessage.isLoading = false;
            },
          });
        }
      });
  }
}

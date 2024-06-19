import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppHeader } from 'src/app/models/app-header.model';
import { AppStore } from 'src/app/stores/app.store';
import { LanguageSelectorDialogComponent } from '../language-selector-dialog/language-selector-dialog.component';
import { ApiUrlsInputDialogComponent } from '../api-urls-input-dialog/api-urls-input-dialog.component';
import { MessageDirectionEnum } from 'src/app/enums/message-direction-enum';
import { Message } from 'src/app/models/message.model';
import { TranslateService } from '@ngx-translate/core';
import { Chat } from 'src/app/models/chat.model';
import { ApiUrlsData } from 'src/app/models/api-urls-data.model';
import { MessageTypeEnum } from 'src/app/enums/message-type-enum';

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
            let responseMessage: Message = {
              direction: MessageDirectionEnum.response,
              sendingDate: new Date(),
              type: MessageTypeEnum.text,
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
          aiCompanionApiUrl: this.store.appHeader.currentAiCompanionApiUrl,
        },
        width: '600px',
      })
      .afterClosed()
      .subscribe((result: ApiUrlsData) => {
        if (result) {
          this.store.setApiUrls(result);

          // send message
          let responseMessage: Message = {
            direction: MessageDirectionEnum.response,
            sendingDate: new Date(),
            type: MessageTypeEnum.text,
            text: this.translate.instant('EDIT_API_URL_MESSAGE'),
          };
          this.chat.messages.unshift(responseMessage);
        }
      });
  }
}

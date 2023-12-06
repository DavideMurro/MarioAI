import { Injectable } from '@angular/core';
import { AppHeader } from '../models/app-header.model';
import { Chat } from '../models/chat.model';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { i18n } from 'src/assets/i18n/i18n';

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  public appHeader: AppHeader;
  public chat: Chat;

  constructor(private translate: TranslateService) {
    // initialize attributes
    this.appHeader = {
      title: environment.appTitle,
      languages: i18n,
      currentLanguageCode: environment.defaultLanguageCode,
      defaultLanguageCode: environment.defaultLanguageCode,
      currentStableDiffusionApiUrl: environment.defaultStableDiffusionApiUrl,
    };
    this.chat = { messages: [] };

    // init methods
    this.initTranslate();
  }

  private initTranslate() {
    this.translate.addLangs(this.appHeader.languages.map((l) => l.code));
    this.translate.setDefaultLang(this.appHeader.defaultLanguageCode);
    this.translate.use(this.appHeader.defaultLanguageCode);
  }

  public setLanguage(languageCode: string) {
    this.appHeader.currentLanguageCode = languageCode;
    this.translate.use(this.appHeader.currentLanguageCode);
  }

  public setApiUrls(apiUrls: any) {
    this.appHeader.currentStableDiffusionApiUrl =
      apiUrls.currentStableDiffusionApiUrl;
  }
}

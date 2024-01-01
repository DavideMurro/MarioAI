import { Injectable } from '@angular/core';
import { AppHeader } from '../models/app-header.model';
import { Chat } from '../models/chat.model';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { i18n } from 'src/assets/i18n/i18n';
import { ApiUrlsData } from '../models/api-urls-data.model';
import { Observable } from 'rxjs';

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
  }

  public setLanguage(languageCode: string): Observable<any> {
    this.appHeader.currentLanguageCode = languageCode;
    return this.translate.use(this.appHeader.currentLanguageCode);
  }

  public setApiUrls(apiUrls: ApiUrlsData) {
    this.appHeader.currentStableDiffusionApiUrl = apiUrls.stableDiffusionApiUrl;
  }
}

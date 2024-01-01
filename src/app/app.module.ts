import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { LanguageSelectorDialogComponent } from './components/language-selector-dialog/language-selector-dialog.component';
import { ApiUrlsInputDialogComponent } from './components/api-urls-input-dialog/api-urls-input-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { LOCATION_INITIALIZED } from '@angular/common';
import { AppStore } from './stores/app.store';
import { environment } from 'src/environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    environment.languagesPathDirectory,
    environment.languagesFileFormat
  );
}
// Define factory function AppInitializerFactory
export function AppInitializerFactory(
  injector: Injector,
  appStore: AppStore,
  translate: TranslateService
) {
  return () =>
    new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null)
      );
      locationInitialized.then(() => {
        translate.addLangs(appStore.appHeader.languages.map((l) => l.code));
        translate.setDefaultLang(appStore.appHeader.defaultLanguageCode);
        translate.use(appStore.appHeader.defaultLanguageCode).subscribe({
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {
            resolve(null);
          },
        });
      });
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatInputComponent,
    ChatBoxComponent,
    LanguageSelectorDialogComponent,
    ApiUrlsInputDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [Injector, AppStore, TranslateService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

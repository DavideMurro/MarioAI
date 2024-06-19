import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOCATION_INITIALIZED } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppStore } from './stores/app.store';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

import { HeaderComponent } from './components/header/header.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { LanguageSelectorDialogComponent } from './components/language-selector-dialog/language-selector-dialog.component';
import { ApiUrlsInputDialogComponent } from './components/api-urls-input-dialog/api-urls-input-dialog.component';

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
        EnumToArrayPipe,
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
          },
      }),

      ReactiveFormsModule,

      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatCardModule,
      MatSelectModule,
      MatDialogModule,
      MatRadioModule
    ], 
    providers: [
      {
          provide: APP_INITIALIZER,
          useFactory: AppInitializerFactory,
          deps: [Injector, AppStore, TranslateService],
          multi: true,
      },
      provideHttpClient(withInterceptorsFromDi()),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

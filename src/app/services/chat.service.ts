import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextToImageResponse } from '../models/text-to-image-response.model';
import { AppStore } from '../stores/app.store';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private store: AppStore) {}

  public sendMessageToText(message: string): Observable<string> {
    const httpUrl = this.store.appHeader.currentAiCompanionApiUrl + '/prompt';
    const httpParams = {
      prompt: message,
    };
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'text' as 'json',
    };

    return this.http.post<string>(httpUrl, httpParams, httpOptions);
  }

  public sendMessageToImage(message: string): Observable<TextToImageResponse> {
    const httpUrl =
      this.store.appHeader.currentStableDiffusionApiUrl + '/txt2img';
    const httpParams = {
      prompt: message,
      steps: '55',
      n_iter: Math.floor(Math.random() * (5 - 1) + 1),
      /*save_images: true,
      samples: '1',
      guidance_scale: 10,*/
    };
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http.post<TextToImageResponse>(
      httpUrl,
      httpParams,
      httpOptions
    );
  }

  public testConnectionAiCompanion(): Observable<boolean> {
    const httpUrl =
      this.store.appHeader.currentAiCompanionApiUrl + '/companion';

    return new Observable((observer) =>
      this.http.get<any>(httpUrl).subscribe({
        next: (result: any) => {
          observer.next(true);
        },
        error: (error: any) => {
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        },
      })
    );
  }

  public testConnectionStableDiffusion(): Observable<boolean> {
    const httpUrl =
      this.store.appHeader.currentStableDiffusionApiUrl + '/options';

    return new Observable((observer) =>
      this.http.get<any>(httpUrl).subscribe({
        next: (result: any) => {
          observer.next(true);
        },
        error: (error: any) => {
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        },
      })
    );
  }
}

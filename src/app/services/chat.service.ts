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

  public sendMessage(message: string): Observable<TextToImageResponse> {
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

  public testConnection(): Observable<boolean> {
    const httpUrl =
      this.store.appHeader.currentStableDiffusionApiUrl + '/options';

    //return this.http.get<any>(httpUrl);
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

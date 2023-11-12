import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextToImageResponse } from '../models/text-to-image-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  public sendMessage(message: string): Observable<TextToImageResponse> {
    let minImagesCount = 1;
    let maxImagesCount = 5;
    const httpUrl = environment.stableDiffusionApiUrl + '/txt2img';
    const httpParams = {
      prompt: message,
      steps: '55',
      n_iter: Math.floor(
        Math.random() * (maxImagesCount - minImagesCount) + minImagesCount
      ),
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
}

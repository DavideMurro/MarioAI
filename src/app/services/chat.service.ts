import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextToImageResponse } from '../models/text-to-image-response.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  public sendMessage(message: string): Observable<TextToImageResponse> {
    const httpUrl = 'https://5b703ea07a590a9389.gradio.live/sdapi/v1/txt2img';
    const httpParams = {
      prompt: message,
      save_images: false,
      steps: '20',
      /*samples: '1',
      guidance_scale: 10,*/
    };
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    return this.http.post<TextToImageResponse>(
      httpUrl,
      httpParams,
      httpOptions
    );
  }
}

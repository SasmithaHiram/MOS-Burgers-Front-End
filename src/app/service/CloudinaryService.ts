import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private url = 'http://localhost:8080/image';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<{ imageURL: string }> {
    const formDate = new FormData();
    formDate.append('file', file);
    return this.http
      .post<{ imageURL: string }>(`${this.url}/upload`, formDate, {
        responseType: 'text' as 'json',
      })
      .pipe(
        map((response: any) => {
          return { imageURL: response as string };
        })
      );
  }
}

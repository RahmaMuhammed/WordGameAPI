import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'https://localhost:7260/api/words';

  constructor(private http: HttpClient) {}

 getWord(category: string, difficulty: string): Observable<any> {
  const url = `${this.apiUrl}?category=${category}&difficulty=${difficulty}`;
  console.log('Sending request to:', url);
  return this.http.get(url);
}

}
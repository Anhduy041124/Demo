import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',//Định dạng kiểu dữ liệu là json
    }),
  };

  constructor(private httpClient: HttpClient) {}
  //get All Methods lấy tất cả dữ liệu
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/').pipe(// Gửi yêu cầu GET đến API
      catchError((error: HttpErrorResponse) => {// Bắt lỗi nếu có 
        return throwError(error);
      })
    );
  }
  // create tạo một bài viết
  create(post: Post): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
  //find data một bài viết cụ thể qua id 
  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/' + id).pipe(   // Gửi yêu cầu GET đến API với id cụ thể.
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  //update
  update(id: number, post: Post): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)//Gửi yêu cầu PUT với dữ liệu bài viết.
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
  //delete
  delete(id: number) {
    return this.httpClient.delete(this.apiURL + '/posts/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}

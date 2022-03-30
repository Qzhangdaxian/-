// import { map, concatAll } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';

// const fileUploadId = 0;


// @Injectable({
//   providedIn: 'root'
// })
// export class FileUploadService {

//   upload$ = new Subject<File>();
//   uploadPath = '/oss/file/upload';
//   headers = new HttpHeaders({
//     'Content-Type': 'multipart/form-data'
//   });
//   preview = '';
//   fileUploaded$ = new Subject<UploadedData>();

//   constructor(
//     private http: HttpClient
//   ) {
//     this.upload$.pipe(
//       map((file: File) => {
//         if (window.URL) {
//           this.preview = URL.createObjectURL(file);
//         }
//         return this.upload(file);
//       }),
//       concatAll(),
//       map(resp => resp.data)
//     ).subscribe(data => {
//       this.fileUploaded$.next(data);
//     });
//   }
//   upload(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.set('file', file);
//     return this.http.post(this.uploadPath, formData, {
//       headers: this.headers
//     });
//   }

//   delete(id: string): Observable<any> {
//     return this.http.post(`/oss/file/delete?id=${ id }`, {});
//   }
// }

// export interface UploadedData {
//   createBy: string;
//   createTime: string;
//   fileName: string;
//   id: string;
//   update: any;
//   updateTime: any;
//   url: string;
// }

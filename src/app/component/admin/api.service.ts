// import {HttpClient} from '@angular/common/http';
// import {SearchModelEntity} from './search-model-entiry';
// import {Injectable} from '@angular/core';
//
//
// // url = "http://localhost:8080/api";
// export class Api {
//     constructor(private http: HttpClient) {
//     }
//     getListPosts(searchModel: SearchModelEntity) {
//         return this.http.post('http://localhost:8080/api/posts/search', {searchModel}).toPromise().then((data: any) => {
//             console.log('data: ', data);
//         });
//     }
//
//     createPosts(searchModel: SearchModelEntity) {
//         return this.http.post('http://localhost:8080/api/posts/create', {searchModel}).toPromise().then((data: any) => {
//             console.log('data: ', data);
//         });
//     }
//
//     updatePosts(searchModel: SearchModelEntity) {
//         return this.http.post('http://localhost:8080/api/posts/update', {searchModel}).toPromise().then((data: any) => {
//             console.log('data: ', data);
//         });
//     }
//
//     deletePosts(searchModel: SearchModelEntity) {
//         return this.http.post('http://localhost:8080/api/posts/delete', {searchModel}).toPromise().then((data: any) => {
//             console.log('data: ', data);
//         });
//     }
// }

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dataSubjectSearch = new BehaviorSubject<any>('');
  private dataSubjectCategory = new BehaviorSubject<any>('');
  private dataSubjectEditPosts = new BehaviorSubject<any>('');
  private dataSubjectIdPost = new BehaviorSubject<any>('');
  dataSearch$ = this.dataSubjectSearch.asObservable();
  dataCategory$ = this.dataSubjectCategory.asObservable();
  dataEditPosts$ = this.dataSubjectEditPosts.asObservable();
  dataIdPost$ = this.dataSubjectIdPost.asObservable();

  sendDataSearch(data: string) {
    this.dataSubjectSearch.next(data);
  }

  sendDataCategory(data: string) {
    this.dataSubjectCategory.next(data);
  }

  sendDataEditPosts(data: string) {
    this.dataSubjectEditPosts.next(data);
  }

  sendDataIdPost(data: any) {
    this.dataSubjectIdPost.next(data);
  }
}

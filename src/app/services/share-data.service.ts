import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dataSubjectSearch = new BehaviorSubject<any>('');
  private dataSubjectCategory = new BehaviorSubject<any>('');
  private dataSubjectEditPosts = new BehaviorSubject<any>('');
  private dataSubjectEditComment = new BehaviorSubject<any>('');
  dataSearch$ = this.dataSubjectSearch.asObservable();
  dataCategory$ = this.dataSubjectCategory.asObservable();
  dataEditPosts$ = this.dataSubjectEditPosts.asObservable();
  dataEditComment$ = this.dataSubjectEditComment.asObservable();

  sendDataSearch(data: string) {
    this.dataSubjectSearch.next(data);
  }

  sendDataCategory(data: string) {
    this.dataSubjectCategory.next(data);
  }

  sendDataEditPosts(data: string) {
    this.dataSubjectEditPosts.next(data);
  }

  sendDataEditComment(data: any) {
    this.dataSubjectEditComment.next(data);
  }
}

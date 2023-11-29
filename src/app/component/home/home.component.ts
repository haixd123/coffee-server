import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchModelEntity} from '../admin/search-model-entiry';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ShareDataService} from '../../services/share-data.service';
import {log} from 'ng-zorro-antd';
import {newArray} from '@angular/compiler/src/util';
import {Api} from '../../services/api';
import {WebsocketService} from '../../services/Websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();
  formSearch: FormGroup;
  formSearchNotify: FormGroup;


  isCoffee = 0;

  searchCoffee: any;

  userLocalstorage: any;

  dataCategory: any[];
  dataPost = [];
  dataNotify: any[];
  dataNotify2 = [];
  total: number;

  inputChatAsk: string;
  dataChat = [];
  autoFocus: boolean;
  isDisabledInputChat: boolean;
  isWaitingReply: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private api: Api,
    private websocketService: WebsocketService,
  ) {
    this.formSearch = this.fb.group({
      name: null
    }, {});

    this.formSearchNotify = this.fb.group({
      toUser: null,
    });
    this.handleUpdate();

    this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
    this.websocketService.receiveComment().subscribe((comment: any) => {
      this.handleUpdate();
    });
  }

  ngOnInit(): void {
  }

  sendData(value?: any) {
    this.shareDataService.sendDataSearch(value ? value : this.searchCoffee);
  }


  async handleUpdate(searchModel?: SearchModelEntity) {
    await this.http.get('http://localhost:8080/api/posts/search-list-category').toPromise().then((data: any) => {
      this.dataCategory = data.data;
      this.total = data.optional;
    });

    this.formSearchNotify.get('toUser').setValue(JSON.parse(localStorage.getItem('user')).id);
    await this.http.post('http://localhost:8080/api/notify/search-all-notify', this.formSearchNotify.value).toPromise().then((data: any) => {
      this.dataNotify = data.data;
      console.log('this.dataNotify: ', this.dataNotify);
    });

    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 150;
    await this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
      // for (const item of data.data) {
      //   for (const item2 of this.dataNotify) {
      //     if (item.id == item2.postId) {
      //       this.dataPost.push(item);
      //       this.dataNotify2.push(item2);
      //     }
      //   }
      // }
    });

  }

  handleSearch() {
    // this.searchModel.pageIndex = 1;
    // this.searchModel.pageSize = 100;
    // // this.formSearch.get('name').setValue(this.formSearch.get('nameSearch').value);
    // // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // this.handleUpdate(this.searchModel, true);
  }


  logOut() {
    this.isCoffee = 4;
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  linkToCoffee() {
    this.isCoffee = 1;
    this.router.navigate(['/home/coffee-bean']);
    this.shareDataService.sendDataSearch('');
  }

  linkToEquipment() {
    this.isCoffee = 2;
    this.router.navigate(['/home/equipment']);
  }

  linkToPost() {
    this.isCoffee = 3;
    this.shareDataService.sendDataCategory('');
    this.router.navigate(['/home/posts']);
  }

  linkToContact() {
    this.isCoffee = 4;
  }

  noBody() {
    this.isCoffee = 5;
  }


  category(value) {
    this.shareDataService.sendDataCategory(value);
    this.router.navigate(['/home/posts/', value]);
  }


  handleSubmitChat() {
    this.dataChat.push({user: this.inputChatAsk});
    this.autoFocus = true;
    this.isDisabledInputChat = true;
    this.isWaitingReply = true;
    this.http.get(`http://localhost:8080/bot/chat?prompt=${this.inputChatAsk}`).toPromise().then(data => {
      console.log('success1');
      console.log('data: ', data);
      console.log('success2');
    }, error => {
      this.isDisabledInputChat = false;
      this.isWaitingReply = false;
      return this.dataChat.push({bot: error.error.text});
    });
    this.inputChatAsk = '';
  }

  linkToPostDetail(item: any) {
    console.log('linkToPostDetail | item: ', item);
    localStorage.setItem('postsCategory', item.category);
    this.shareDataService.sendDataCategory(item.category);
    this.router.navigate([`/home/detail/posts/${item.category}/${item.postId}`]);
  }
}

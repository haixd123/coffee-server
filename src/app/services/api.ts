import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../component/admin/search-model-entiry';
import {BaseService} from '../shared/base-service/base-service.service';

// import {BaseService} from './base-service.service';


@Injectable({
  providedIn: 'root'
})
// export class ImgUploadService extends BaseService {
export class Api extends BaseService{

  // imgUpload(url: string, formData: FormData): Observable<any> {
  //   return this.http.post(url, formData);
  // }

  getListCoffee(searchModel: SearchModelEntity) {
    return this.post('/coffee/search', searchModel);
  }

  createCoffeeBean(searchModel: SearchModelEntity) {
    return this.post('/coffee/create', searchModel);
  }

  updateCoffeeBean(searchModel: SearchModelEntity) {
    return this.post('/coffee/update', searchModel);
  }

  deleteCoffeeBean(searchModel: SearchModelEntity) {
    return this.post('/coffee/delete', searchModel);
  }

  getListEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/search', searchModel);
  }

  createEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/create', searchModel);
  }

  updateEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/update', searchModel);
  }

  deleteEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/delete', searchModel);
  }

  getListPosts(searchModel: SearchModelEntity) {
    return this.post('/posts/search', searchModel);
  }

  getListCategoryPosts(searchModel: SearchModelEntity) {
    return this.post('/posts/search-list-category', searchModel);
  }

  getListTotalPosts(searchModel: SearchModelEntity) {
    return this.post('/posts/searchTotalPost', searchModel);
  }

  createPosts(searchModel: SearchModelEntity) {
    return this.post('/posts/create', searchModel);
  }

  updatePosts(searchModel: SearchModelEntity) {
    return this.post('/posts/update', searchModel);
  }

  deletePosts(searchModel: SearchModelEntity) {
    return this.post('/posts/delete', searchModel);
  }
}

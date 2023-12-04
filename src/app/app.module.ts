import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CaretLeftOutline, SettingOutline, StepBackwardOutline} from '@ant-design/icons-angular/icons';
import {IconDefinition} from '@ant-design/icons-angular';
import {IconsProviderModule} from './icons-provider.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NotificationService} from './services/notification.service';
import {NzConfigService, NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {BsDatepickerModule, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {BsDatepickerActions} from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {vi_VN} from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {FilterPipe} from './shared/pipe/filter.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Api} from './services/api';
import {AppConfigService} from '../app-config.service';
import {PaginationService} from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {TranslateModule} from '@ngx-translate/core';

registerLocaleData(vi);


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    UnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzIconModule,
    IconsProviderModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FontAwesomeModule,
    CarouselModule,
    TranslateModule.forRoot(),
  ],
  // tslint:disable-next-line:max-line-length
  providers: [AppConfigService, Api, NotificationService, NzConfigService, NzNotificationService, NzMessageService, DatePipe, FilterPipe, {
    provide: NZ_I18N,
    useValue: vi_VN
  }]
})
export class AppModule {
}

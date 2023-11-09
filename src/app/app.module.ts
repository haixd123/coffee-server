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
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NotificationService} from './services/notification.service';
import {NzConfigService, NzMessageService, NzNotificationService} from 'ng-zorro-antd';
//???
// import { environment} from 'ng-zorro-antd';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {BsDatepickerModule, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {BsDatepickerActions} from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
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
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  // tslint:disable-next-line:max-line-length
  providers: [NotificationService, NzConfigService, NzNotificationService, NzMessageService, DatePipe, { provide: NZ_I18N, useValue: vi_VN } ]
})
export class AppModule {
}

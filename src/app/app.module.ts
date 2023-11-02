import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CaretLeftOutline, SettingOutline, StepBackwardOutline } from '@ant-design/icons-angular/icons';
import {IconDefinition} from '@ant-design/icons-angular';
import { IconsProviderModule } from './icons-provider.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NotificationService} from './services/notification.service';
import {environment, NzConfigService, NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';


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
  providers: [NotificationService, NzConfigService, NzNotificationService, NzMessageService]
})
export class AppModule {
}

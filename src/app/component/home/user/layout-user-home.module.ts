import {NgModule} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {InfoComponent} from './info/info.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

@NgModule({
  declarations: [InfoComponent, MyPostsComponent],
  imports: [NzFormModule, NgZorroAntdModule, SharedModule,
    RouterModule.forChild([])],
  providers: []
})
export class LayoutUserHomeModule {
}

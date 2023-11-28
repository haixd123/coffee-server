import {NgModule} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {InfoComponent} from './info/info.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SavePostsComponent } from './save-posts/save-posts.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [InfoComponent, MyPostsComponent, SavePostsComponent],
    imports: [NzFormModule, NgZorroAntdModule, SharedModule,
        RouterModule.forChild([]), NgxPaginationModule],
  providers: []
})
export class LayoutUserHomeModule {
}

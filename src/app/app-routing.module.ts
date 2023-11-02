import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {HomeComponent} from './component/home/home.component';
import {HomePostsComponent} from './component/home/posts/home-posts.component';
import {HomeCoffeeBeanComponent} from './component/home/home-coffee-bean/home-coffee-bean.component';
import {PostsDetailComponent} from './component/home/posts-detail/posts-detail.component';
import {TestCkeditorComponent} from './component/home/test-ckeditor/test-ckeditor.component';
import {TableEquipmentComponent} from './component/admin/table-equipment/table-equipment.component';
import {TablePostsComponent} from './component/admin/table-posts/table-posts.component';
import {TableCoffeeBeanComponent} from './component/admin/table-coffee-bean/table-coffee-bean.component';
import {TableUserComponent} from './component/admin/table-user/table-user.component';
import {VietBaiComponent} from './component/home/viet-bai/viet-bai.component';
import {CkeditorDetailComponent} from './component/home/detail-coffee-bean/ckeditor-detail.component';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./component/admin/layout-admin.module').then(m => m.LayoutAdminModule),
      },
      {
        path: 'equipment',
        component: TableEquipmentComponent,
      },
      {
        path: 'posts',
        component: TablePostsComponent,
      },
      {
        path: 'coffee-bean',
        component: TableCoffeeBeanComponent,
      },
      {
        path: 'user',
        component: TableUserComponent,
      }
    ],
    data: {
      breadcrumb: 'Home',
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./component/home/layout-home.module').then(m => m.LayoutHomeModule),
      },
      {
        path: 'coffee-bean',
        component: HomeCoffeeBeanComponent,
      },
      {
        path: 'posts',
        component: HomePostsComponent,
      },
      {
        path: 'posts/detail',
        component: PostsDetailComponent,
      },
      {
        path: 'coffee-bean/detail',
        component: CkeditorDetailComponent,
      },
      {
        path: 'posts/write',
        component: VietBaiComponent,
      }
    ],
    data: {
      breadcrumb: 'Home',
    }
  },
  {
    path: 'auth',
    // component: LoginComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./component/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ],
    data: {
      breadcrumb: 'Home',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/admin',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   children: [
  // {
  //   path: 'coffee-bean',
  //   // tslint:disable-next-line:max-line-length
  //   loadChildren: () => import('./layout-admin.module').then(m => m.LayoutAdminModule),
  // }
  //   ],
  //   data: {
  //     breadcrumb: 'Home',
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {
}

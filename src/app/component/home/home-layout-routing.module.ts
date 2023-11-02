// import {RouterModule, Routes} from '@angular/router';
// import {NgModule} from '@angular/core';
// import {HomeComponent} from './home.component';
//
// const routes: Routes = [
//   // {
//   //   path: '',
//   //   redirectTo: '/home',
//   //   pathMatch: 'full'
//   // },
//   {
//     path: '',
//     component: HomeComponent,
//     children: [
//       {
//         path: 'coffee-bean',
//         // tslint:disable-next-line:max-line-length
//         loadChildren: () => import('./layout-home.module').then(m => m.LayoutHomeModule),
//       },
//       {
//         path: 'posts',
//         // tslint:disable-next-line:max-line-length
//         loadChildren: () => import('./posts/home-posts-layout.module').then(m => m.HomePostsLayoutModule),
//       }
//     ],
//     data: {
//       breadcrumb: 'Home',
//     }
//   }
//
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class HomeLayoutRoutingModule { }

import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './pages/login/login.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TableComponent } from './pages/table/table.component';

// import { AuthGuard } from '@guards/auth.guard';
import { TokenService } from '@services/token.service';




const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'boards',
    component: BoardsComponent
  },
  {
    path: 'board',
    component: BoardComponent
  },
  // {
  //   path: 'scroll',
  //   component: ScrollComponent
  // },
  // {
  //   path: 'table',
  //   component: TableComponent
  // },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    // canActivate: [ AuthGuard ],
    canActivate: [() => inject(TokenService).checkToken()],
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

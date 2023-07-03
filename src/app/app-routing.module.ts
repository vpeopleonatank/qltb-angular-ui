import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { UserService } from './core/services/user.service';
import { map } from 'rxjs/operators';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
      canActivate: [
        authGuard
      ]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  // {
  //   path: 'article/:slug',
  //   loadComponent: () =>
  //     import('./features/article/article.component').then(
  //       (m) => m.ArticleComponent
  //     ),
  // },
  // {
  //   path: 'editor',
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () =>
  //         import('./features/editor/editor.component').then(
  //           (m) => m.EditorComponent
  //         ),
  //       canActivate: [() => inject(UserService).isAuthenticated],
  //     },
  //     {
  //       path: ':slug',
  //       loadComponent: () =>
  //         import('./features/editor/editor.component').then(
  //           (m) => m.EditorComponent
  //         ),
  //       canActivate: [() => inject(UserService).isAuthenticated],
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

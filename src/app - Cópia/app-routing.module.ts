import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'add', loadChildren: './produto/add/add.module#AddPageModule' },
  { path: 'edit', loadChildren: './produto/edit/edit.module#EditPageModule' },
  { path: 'list', loadChildren: './produto/list/list.module#ListPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

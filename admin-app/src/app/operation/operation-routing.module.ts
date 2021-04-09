import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent as TypeIndexPage } from './page/type/index/index.component';
import { IndexComponent as LocationIndexPage } from './page/location/index/index.component';
import { IndexComponent as CategoryIndexPage } from './page/category/index/index.component';


const routes: Routes = [
  {
    path: 'operation',
    children: [
      { path: 'type', component: TypeIndexPage },
      { path: 'location', component: LocationIndexPage },
      { path: 'category', component: CategoryIndexPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }

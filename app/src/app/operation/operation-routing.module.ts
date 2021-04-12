import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './page/operation/index/index.component';


const routes: Routes = [
  {
    path: 'operation',
    children: [
      {path: 'list', component: IndexComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }

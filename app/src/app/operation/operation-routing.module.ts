import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './page/operation/index/index.component';
import {ShortGraphComponent} from './page/short-graph/short-graph.component';


const routes: Routes = [
  {
    path: 'operation',
    children: [
      {path: 'list', component: IndexComponent},
      {path: 'short-graph', component: ShortGraphComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }

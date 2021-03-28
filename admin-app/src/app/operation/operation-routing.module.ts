import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent as TypeComponent } from './page/type/index/index.component';


const routes: Routes = [
  {
    path: 'operation',
    children: [
      { path: 'type', component: TypeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent as TypeCreateComponent } from './page/type/create/create.component';


const routes: Routes = [
  {
    path: 'operation',
    children: [
      {
        path: 'type',
        children: [
          { path: 'create', component: TypeCreateComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }

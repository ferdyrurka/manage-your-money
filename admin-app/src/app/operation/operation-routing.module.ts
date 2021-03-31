import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent as TypeIndexComponent } from './page/type/index/index.component';
import { IndexComponent as LocationIndexComponent } from './page/location/index/index.component';


const routes: Routes = [
  {
    path: 'operation',
    children: [
      { path: 'type', component: TypeIndexComponent },
      { path: 'location', component: LocationIndexComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }

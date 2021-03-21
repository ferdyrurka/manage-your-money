import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {OperationModule} from './operation/operation.module';
import {OperationRoutingModule} from './operation/operation-routing.module';
import {environment} from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTreeModule} from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserModule,
        AppRoutingModule,
        OperationModule,
        OperationRoutingModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

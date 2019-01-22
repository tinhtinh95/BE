import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GstAddComponent } from './gst-add/gst-add.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BusinessService } from './business.service';

@NgModule({
  declarations: [
    AppComponent,
    GstAddComponent,
    GstGetComponent,
    GstEditComponent
  ],
  imports: [
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  RouterModule.forRoot([
    {
      path: 'business',
      component: GstGetComponent
    },
    {
      path: 'business/create',
      component: GstAddComponent
    },
    {
      path: 'business/edit/:id',
      component: GstEditComponent
    },
  ])
  ],
  providers: [
    BusinessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

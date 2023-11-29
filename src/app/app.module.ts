import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { InsertComponent } from './insert/insert.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavComponent,
        InsertComponent,
        DetailComponent,
        EditComponent,
        FooterComponent
    ],
    providers: [DatePipe, MessageService],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        ToastModule
    ]
})
export class AppModule { }

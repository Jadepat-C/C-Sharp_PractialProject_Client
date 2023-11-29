import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsertComponent } from './insert/insert.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: InsertComponent },
  { path: 'detail/:id', component: DetailComponent},
  { path: 'edit/:id',component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

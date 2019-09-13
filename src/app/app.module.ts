import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import{TaskmanagerService} from './service/taskmanager.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './filter.pipe';
import { AdduserComponent } from './adduser/adduser.component';
import { AddprojectComponent} from './addproject/addproject.component'


const appRoutes:Routes = [
  {path:'addTask', component:AddtaskComponent},
  {path:'addProject', component:AddprojectComponent},
  {path:'addUser', component:AdduserComponent},
  {path:'viewTask', component:ViewtaskComponent},
  {path:'updateTask/:taskId', component:UpdatetaskComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    UpdatetaskComponent,
    AddprojectComponent,
    FilterPipe,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskmanagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

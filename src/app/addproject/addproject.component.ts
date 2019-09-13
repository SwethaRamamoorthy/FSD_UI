import { Component, OnInit } from '@angular/core';
import { Project } from '../module/project';
import { TaskmanagerService } from '../service/taskmanager.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})

export class AddprojectComponent implements OnInit {

  project:Project
  isDisabled:boolean;
  errMessage: string;
  projectList : Array<Project>

  constructor(private taskService : TaskmanagerService) {
    this.taskService.fetchProjectFromServer();
  }

  ngOnInit() {
    this.project= new Project();
    this.isDisabled = true;

    this.taskService.getProjects()
    .subscribe( (data:Project[]) => {
      debugger;
      this.projectList = data;
      this.projectList = [];
      data.forEach(d => {
        debugger;
        if(!this.projectList.includes(d))
          this.projectList.push(d);
      })
    });
  
  }

  triggerSomeEvent() {
    this.isDisabled = !this.isDisabled;
    return;
}

saveProject(project:Project) {
  this.errMessage = '';
  const msg = 'Please fill all the fields';

  if ( this.project === null || typeof(this.project) === 'undefined') {
    this.errMessage = msg;
    return false;
  }

  if ( this.project.projectName === null || this.project.manager === null  || typeof(this.project.projectName) === 'undefined'
    || typeof(this.project.manager) === 'undefined' ) {
    this.errMessage = msg;
    return false;
  }

  if ( this.project.projectName.trim() === '' || this.project.projectName.trim() === '') {
    this.errMessage = msg;
    return false;
  }


  this.taskService.addProject(project).subscribe(() => {
    this.project = new Project();
  },
  err => {
    this.errMessage = err.message;
  });

  //window.location.reload();
  console.log("data recieved" + JSON.stringify(project));
}

}

import { Component, OnInit } from '@angular/core';
import{Task} from '../module/task'
import{TaskmanagerService} from '../service/taskmanager.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  task:Task
  taskList : Array<Task>
  errMessage: string;
  sDateString:string;
  eDateString: string;
  
  constructor(private taskService : TaskmanagerService) {
  	this.taskService.fetchTaskFromServer();  
    
  }

  ngOnInit() {
    this.task = new Task();

      	  this.taskService.getTasks()
  	  				.subscribe( (data:Task[]) => {
                this.taskList = data;
                this.taskList = [];
                data.forEach(d => {
                  if(!this.taskList.includes(d))
                    this.taskList.push(d);
                })
  	  				});
  }


  updateDates() {
  	this.task.startDate=new Date(this.sDateString);
  	this.task.endDate=new Date(this.eDateString);
  }


  saveTask(task:Task) {
  	this.errMessage = '';
    const msg = 'Please fill all the fields';

    if ( this.task === null || typeof(this.task) === 'undefined') {
      this.errMessage = msg;
      return false;
    }

    if ( this.task.taskTitle === null || this.task.priority === null  || typeof(this.task.taskTitle) === 'undefined'
      || typeof(this.task.priority) === 'undefined' ) {
      this.errMessage = msg;
      return false;
    }

    if ( this.task.taskTitle.trim() === '' || this.task.taskTitle.trim() === '') {
      this.errMessage = msg;
      return false;
    }


  	this.taskService.addTask(task).subscribe(() => {
      this.task = new Task();
      this.sDateString='';
      this.eDateString='';
    },
    err => {
      this.errMessage = err.message;
    });

    //window.location.reload();
    console.log("data recieved" + JSON.stringify(task));
  }


}

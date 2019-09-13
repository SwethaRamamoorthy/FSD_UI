import{ Component, OnInit } from '@angular/core';
import{Task} from '../module/task';
import{TaskmanagerService} from '../service/taskmanager.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  task : Array<Task>;
  taskMessage : Task;
  message:string;
  searchText:string;
  searchObj: Task;
searchByTaskName:string;
searchByParentTaskName:string;
searchByPriorityFrom:string;
searchByPriorityTo:string;
searchByStartDate:string;
searchByEndDate:string;

  constructor(private taskService : TaskmanagerService) {
	  this.searchObj = new Task();
 	this.taskService.fetchTaskFromServer();  
  }

  ngOnInit() {
  	  this.taskService.getTasks()
  	  				.subscribe( (data) => {
  	  					this.task = data;
  	  				});

  }

  endTask(taskId : string) {
  	console.log("task id is" + taskId)
  	this.taskService.endTask(taskId)
  	.subscribe((data) => {
  		console.log(data);
  		this.message = "End task is succesfully done";
  		this.taskService.fetchTaskFromServer();
  	},
  	 (error) => {
  	 	console.log(error);
  	 	this.message = "Please close sub task before parent task";
  	 }				
  	);
  }

}

import { Component, OnInit } from '@angular/core';
import { Task } from '../module/task';
import { TaskmanagerService } from '../service/taskmanager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  parentTaskNames: Array<Task>
  task: Task;

  constructor(private taskService: TaskmanagerService, private route: ActivatedRoute) {
    this.taskService.fetchTaskFromServer();
    this.task = new Task()
  }

  ngOnInit() {
    const allParams = this.route.snapshot.params;
    const param1 = allParams.taskId;

    this.taskService.getTasksbyId(param1)
      .subscribe((data) => {
        this.task = data;
        console.log("data recieved" + JSON.stringify(this.task));
      });

    this.taskService.getTasks()
      .subscribe((data) => {
        this.parentTaskNames = data;
      });
  }

}

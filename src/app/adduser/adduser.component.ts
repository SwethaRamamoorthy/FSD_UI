import { Component, OnInit } from '@angular/core';
import { User } from '../module/user';
import { TaskmanagerService } from '../service/taskmanager.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user: User
  errMessage: string;
  userList: Array<User>

  constructor(private taskService: TaskmanagerService) {
    this.taskService.fetchUserFromServer();
  }

  ngOnInit() {
    this.user = new User();

    this.taskService.getUsers()
      .subscribe((data: User[]) => {
        debugger;
        this.userList = data;
        this.userList = [];
        data.forEach(d => {
          debugger;
          if (!this.userList.includes(d))
            this.userList.push(d);
        })
      });

  }

  updateUser(id:String){
    this.taskService.updateUser(id).subscribe(() => {
      this.user = new User();
    },
      err => {
        this.errMessage = err.message;
      });
  }

  deleteUser(id:String){
    this.taskService.deleteUser(id).subscribe(() => {
      this.user = new User();
    },
      err => {
        this.errMessage = err.message;
      });
  }


  saveUser(user: User) {
    this.errMessage = '';
    const msg = 'Please fill all the fields';

    if (this.user === null || typeof (this.user) === 'undefined') {
      this.errMessage = msg;
      return false;
    }

    if (this.user.firstName === null || this.user.lastName === null || typeof (this.user.firstName) === 'undefined'
      || typeof (this.user.lastName) === 'undefined') {
      this.errMessage = msg;
      return false;
    }

    if (this.user.firstName.trim() === '' || this.user.lastName.trim() === '') {
      this.errMessage = msg;
      return false;
    }


    this.taskService.addUser(user).subscribe(() => {
      this.user = new User();
    },
      err => {
        this.errMessage = err.message;
      });

    //window.location.reload();
    console.log("data recieved" + JSON.stringify(user));
  }

}

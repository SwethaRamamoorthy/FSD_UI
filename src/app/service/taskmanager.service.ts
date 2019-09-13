import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Task } from '../module/task'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Project } from '../module/project';
import { User } from '../module/user';

@Injectable({
	providedIn: 'root'
})
export class TaskmanagerService {

	taskbyId: any;
	task: Array<Task>;
	taskSubject: BehaviorSubject<Array<Task>>;
	project: Array<Project>;
	projectSubject: BehaviorSubject<Array<Project>>;
	user: Array<User>;
	userSubject: BehaviorSubject<Array<User>>;
	api = 'http://localhost:8080/api';
	header: HttpHeaders;

	constructor(private httpService: HttpClient) {
		this.taskSubject = new BehaviorSubject<Array<Task>>([]);
		this.task = Array<Task>();
		this.taskbyId = new Task();
		this.projectSubject = new BehaviorSubject<Array<Project>>([]);
		this.project = Array<Project>();
		this.userSubject = new BehaviorSubject<Array<User>>([]);
		this.user = Array<User>();
		//this.taskbyId = new Task();

	}

	fetchTaskFromServer() {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.get<Task[]>(this.api + '/gettask', { headers: this.header })
			.subscribe((data) => {
				this.task = data;
				this.taskSubject.next(this.task);
			},
				(error) => {
					console.log(error);
				});

	}

	fetchUserFromServer() {
		debugger;
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.get<User[]>(this.api + '/getusers', { headers: this.header })
			.subscribe((data) => {
				this.user = data;
				this.userSubject.next(this.user);
			},
				(error) => {
					console.log(error);
				});

	}

	fetchProjectFromServer() {
		debugger;
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.get<Project[]>(this.api + '/getprojects', { headers: this.header })
			.subscribe((data) => {
				this.project = data;
				this.projectSubject.next(this.project);
			},
				(error) => {
					console.log(error);
				});
	}

	getTasksbyId(taskId: string): Observable<Task> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.get<Task>(this.api + '/gettaskbyId' + `/${taskId}`, { headers: this.header });
	}

	getTasks(): BehaviorSubject<Array<Task>> {
		return this.taskSubject;
	}

	getProjects(): BehaviorSubject<Array<Project>> {
		return this.projectSubject;
	}

	getUsers(): BehaviorSubject<Array<User>> {
		return this.userSubject;
	}


	endTask(taskId: string): Observable<Task> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService
			.put<Task>(this.api + '/endtaskbyId' + `/${taskId}`, { headers: this.header });
	}


	addTask(task: Task): Observable<Task> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');

		return this.httpService.post<Task>(this.api + '/addtask', task, { headers: this.header });
	}

	addUser(user: User): Observable<User> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');

		return this.httpService.post<User>(this.api + '/adduser', user, { headers: this.header });
	}

	updateUser(id: String): Observable<User> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.put<User>(this.api + '/updateuser' + `/${id}`, { headers: this.header });
	}

	deleteUser(id: String): Observable<User> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.put<User>(this.api + '/deleteuser' + `/${id}`, { headers: this.header });
	}

	addProject(project: Project): Observable<Project> {
		this.header = new HttpHeaders();
		this.header.append('Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');

		return this.httpService.post<Project>(this.api + '/addprj', project, { headers: this.header });
	}


}
export class Task {
	taskTitle: string;
	parentTaskid: string;
	priority: Number;
	startDate: Date;
	endDate: Date;
	priorityfrom: Number;
	priorityto: Number;
	parentTaskTitle: string;
	taskId: string;
	message: string;
	searchText: string;
	status: string;

	constructor() {
		this.taskTitle = '';
		this.parentTaskid = '';
		this.priority = 0;
		this.startDate = new Date();
		this.endDate = new Date();
		this.priorityto = 0;
		this.parentTaskTitle = '';
		this.taskId = '';
		this.message = '';
		this.searchText = '';
		this.status = '';
	}
}

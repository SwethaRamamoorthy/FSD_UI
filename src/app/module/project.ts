export class Project {
	projectName: string;
	startDate: Date;
	endDate: Date;
	manager: string;
	priority: Number;
	status: string;
	projectId: string;
	totalTask: Number;
	totalCompleted: Number;
	
	constructor() {
		this.projectName = '';
		this.projectId = '';
		this.priority = 0;
		this.totalTask = 0;
		this.totalCompleted = 0;
		this.startDate = new Date();
		this.endDate = new Date();
		this.manager = '';
		this.status = '';
	}
}

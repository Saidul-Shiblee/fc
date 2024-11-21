export class Todo {
	title: string;
	description: string;
	completed: boolean;
	selected: boolean;
	deadline?: Date | null;

	constructor(title: string, description: string) {
		this.title = title;
		this.description = description;
		this.completed = false;
		this.selected = false;
		this.deadline = null;
	}
}

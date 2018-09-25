import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../../task.model';
@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks = [];
    title: string;
    constructor(private taskService: TaskService) {
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
        }

    addTask(event) {
        event.preventDefault();
        // console.log(this.title);
        let newTask = {
            title : this.title,
            isDone : false
        };
        this.taskService.addTask(newTask)
            .subscribe(task => {
                this.tasks.push(task);
                this.title = '';
            });
        }

    deleteTask(id) {
        const tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(data => {
            if (data.n === 1) {
                for (let i = 0; i < this.tasks.length; i++) {
                    if (tasks[i]._id === id ) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    }

    updateStatus(task) {
        const _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }

    ngOnInit() {
    }

}
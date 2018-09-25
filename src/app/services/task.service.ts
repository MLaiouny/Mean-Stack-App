import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskService {
    constructor(private http: Http) {
      console.log('Task service initialized...');
    }

    getTasks() {
       return this.http.get('/api/tasks')
        .pipe(map(res => res.json()));
    }

    addTask(newTask) {
        console.log(newTask);
        const headers = new Headers();
        headers.append('content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), {headers: headers})
        .pipe(map(res => res.json()));
    }

    deleteTask(id) {
        return this.http.delete('/api/task/' + id)
            .pipe(map(res => res.json()));
    }

    updateStatus(task) {
        const headers = new Headers();
        headers.append('content-Type', 'application/json');
        return this.http.put('/api/task/' + task._id, JSON.stringify(task), {headers: headers})
        .pipe(map(res => res.json()));
    }
}

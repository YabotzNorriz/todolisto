import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list-component/task-list-component';
import { TaskAddComponent } from './components/task-add-component/task-add-component';
import { TaskEditComponent } from './components/task-edit-component/task-edit-component';

export const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'task/new', component: TaskAddComponent },
  { path: 'task/edit/:id', component: TaskEditComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../Task';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = true;
  error: string | null = null;
  filter = {
    grupo: '',
    completado: 'all' as 'all' | 'completed' | 'pending',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching tasks:', err);
      },
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesGroup =
        !this.filter.grupo ||
        (task.grupo &&
          task.grupo.toLowerCase().includes(this.filter.grupo.toLowerCase()));

      const matchesStatus =
        this.filter.completado === 'all' ||
        (this.filter.completado === 'completed' && task.completado) ||
        (this.filter.completado === 'pending' && !task.completado);

      return matchesGroup && matchesStatus;
    });
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) return '-';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch {
      return '-';
    }
  }

  openAdd() {
    this.router.navigate(['/task/new']);
  }

  openEdit(id: string | number) {
    console.log('/task/edit/' + id);
    this.router.navigate(['/task/edit/' + id]);
  }
}

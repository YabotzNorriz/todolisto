import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit-component.html',
  styleUrl: './task-edit-component.scss',
})
export class TaskEditComponent {
  taskForm: FormGroup;
  taskId: string | number | null = null;
  isLoading = false;
  loadingTask = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      grupo: [''],
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descricao: ['', [Validators.required]],
      completado: [false],
      dataVencimento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (!this.taskId) {
      this.error = 'No task ID provided';
      this.loadingTask = false;
      return;
    }

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        // Format date for datetime-local input
        const dataVencimento = task.dataVencimento
          ? new Date(task.dataVencimento).toISOString().slice(0, 16)
          : '';

        this.taskForm.patchValue({
          grupo: task.grupo,
          titulo: task.titulo,
          descricao: task.descricao,
          completado: task.completado,
          dataVencimento: dataVencimento,
        });
        this.loadingTask = false;
      },
      error: (err) => {
        this.error = 'Failed to load task. Please try again.';
        this.loadingTask = false;
        console.error('Error loading task:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid || !this.taskId) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const formData = this.taskForm.value;
    const updatedTask: Task = {
      taskId: this.taskId as number, // Ensure taskId is included
      grupo: formData.grupo || null,
      titulo: formData.titulo,
      descricao: formData.descricao,
      completado: formData.completado,
      dataVencimento: formData.dataVencimento,
      // Set completion date only if task is being marked as completed
      dataCompleta: formData.completado ? new Date().toISOString() : null,
    };

    // Updated service call with ID and task data
    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.error = 'Failed to update task. Please try again.';
        this.isLoading = false;
        console.error('Error updating task:', err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}

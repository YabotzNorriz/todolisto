import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task';
import { Router } from '@angular/router';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-add-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-add-component.html',
  styleUrl: './task-add-component.scss',
})
export class TaskAddComponent {
  taskForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      grupo: [''],
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descricao: ['', [Validators.required]],
      dataVencimento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const dataFormatada = amanha.toISOString().slice(0, 16);
    this.taskForm.get('dataVencimento')?.setValue(dataFormatada);
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.markFormGroupTouched(this.taskForm);
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    const formData = this.taskForm.value;
    const newTask: Omit<
      Task,
      'taskId' | 'completado' | 'dataCriada' | 'dataCompleta'
    > & {
      completado: boolean;
    } = {
      grupo: formData.grupo || null,
      titulo: formData.titulo,
      descricao: formData.descricao,
      completado: false,
      dataVencimento: formData.dataVencimento,
    };

    this.taskService.createTask(newTask as Task).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully!';
        this.isLoading = false;

        const grupoValue = this.taskForm.get('grupo')?.value;
        this.taskForm.reset();
        this.taskForm.get('grupo')?.setValue(grupoValue);

        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        const dataFormatada = amanha.toISOString().slice(0, 16);
        this.taskForm.get('dataVencimento')?.setValue(dataFormatada);
      },
      error: (err) => {
        this.error = 'Failed to create task. Please try again.';
        if (err.error?.message) {
          this.error = err.error.message;
        }
        this.isLoading = false;
        console.error('Error creating task:', err);
      },
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}

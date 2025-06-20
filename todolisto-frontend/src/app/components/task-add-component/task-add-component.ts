import { Component, OnInit } from '@angular/core';
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

/**
 * Componente responsável pelo formulário de criação de novas tarefas.
 */
@Component({
  selector: 'app-task-add-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-add-component.html',
  styleUrl: './task-add-component.scss',
})
export class TaskAddComponent implements OnInit {
  taskForm: FormGroup; // O formulário reativo para a criação da tarefa
  isLoading = false; // Flag para controlar o estado de carregamento
  error: string | null = null; // Mensagem de erro
  successMessage: string | null = null; // Mensagem de sucesso

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    // Inicializa o formulário com seus controles e validadores
    this.taskForm = this.fb.group({
      grupo: [''],
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descricao: ['', [Validators.required]],
      dataVencimento: ['', [Validators.required]],
    });
  }

  /**
   * Define um valor padrão para a data de vencimento ao inicializar o componente.
   */
  ngOnInit(): void {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const dataFormatada = amanha.toISOString().slice(0, 16); // Formato 'YYYY-MM-DDTHH:mm'
    this.taskForm.get('dataVencimento')?.setValue(dataFormatada);
  }

  /**
   * Função chamada quando o formulário é submetido.
   */
  onSubmit(): void {
    // Se o formulário for inválido, marca todos os campos como "tocados" para exibir os erros
    if (this.taskForm.invalid) {
      this.markFormGroupTouched(this.taskForm);
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    const formData = this.taskForm.value;
    // Cria um objeto de nova tarefa com base nos dados do formulário
    const newTask: Omit<
      Task,
      'taskId' | 'completado' | 'dataCriada' | 'dataCompleta'
    > & {
      completado: boolean;
    } = {
      grupo: formData.grupo || null,
      titulo: formData.titulo,
      descricao: formData.descricao,
      completado: false, // Novas tarefas são sempre pendentes
      dataVencimento: formData.dataVencimento,
    };

    // Chama o serviço para criar a tarefa no backend
    this.taskService.createTask(newTask as Task).subscribe({
      next: () => {
        this.successMessage = 'Tarefa criada com sucesso!';
        this.isLoading = false;

        // Limpa o formulário, mas mantém o valor do grupo para facilitar novas adições
        const grupoValue = this.taskForm.get('grupo')?.value;
        this.taskForm.reset();
        this.taskForm.get('grupo')?.setValue(grupoValue);

        // Reseta a data de vencimento para o dia seguinte novamente
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        const dataFormatada = amanha.toISOString().slice(0, 16);
        this.taskForm.get('dataVencimento')?.setValue(dataFormatada);
      },
      error: (err) => {
        this.error = 'Falha ao criar a tarefa. Por favor, tente novamente.';
        if (err.error?.message) {
          this.error = err.error.message;
        }
        this.isLoading = false;
        console.error('Erro ao criar tarefa:', err);
      },
    });
  }

  /**
   * Marca recursivamente todos os controles de um FormGroup como "touched".
   * @param formGroup O FormGroup a ser marcado.
   */
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Navega de volta para a lista de tarefas.
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}

import { Component, OnInit } from '@angular/core';
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

/**
 * Componente responsável pelo formulário de edição de uma tarefa existente.
 */
@Component({
  selector: 'app-task-edit-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit-component.html',
  styleUrl: './task-edit-component.scss',
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string | number | null = null; // ID da tarefa sendo editada
  isLoading = false; // Flag para o estado de salvamento
  loadingTask = true; // Flag para o estado de carregamento inicial da tarefa
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute, // Para acessar os parâmetros da URL
    private router: Router
  ) {
    // Inicializa o formulário de edição
    this.taskForm = this.fb.group({
      grupo: [''],
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descricao: ['', [Validators.required]],
      completado: [false],
      dataVencimento: ['', [Validators.required]],
    });
  }

  /**
   * No início, obtém o ID da tarefa da URL e carrega seus dados.
   */
  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (!this.taskId) {
      this.error = 'Nenhum ID de tarefa fornecido';
      this.loadingTask = false;
      return;
    }

    // Busca os dados da tarefa no backend
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        // Formata a data de vencimento para o formato aceito pelo input datetime-local
        const dataVencimento = task.dataVencimento
          ? new Date(task.dataVencimento).toISOString().slice(0, 16)
          : '';

        // Preenche o formulário com os dados da tarefa
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
        this.error = 'Falha ao carregar a tarefa. Por favor, tente novamente.';
        this.loadingTask = false;
        console.error('Erro ao carregar tarefa:', err);
      },
    });
  }

  /**
   * Função chamada quando o formulário de edição é submetido.
   */
  onSubmit(): void {
    if (this.taskForm.invalid || !this.taskId) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const formData = this.taskForm.value;
    // Cria o objeto da tarefa atualizada para enviar ao backend
    const updatedTask: Task = {
      taskId: this.taskId as number,
      grupo: formData.grupo || null,
      titulo: formData.titulo,
      descricao: formData.descricao,
      completado: formData.completado,
      dataVencimento: formData.dataVencimento,
      // Define a data de conclusão se a tarefa foi marcada como completa
      dataCompleta: formData.completado ? new Date().toISOString() : null,
    };

    // Chama o serviço para atualizar a tarefa
    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: () => {
        this.router.navigate(['/tasks']); // Retorna para a lista de tarefas após o sucesso
      },
      error: (err) => {
        this.error = 'Falha ao atualizar a tarefa. Por favor, tente novamente.';
        this.isLoading = false;
        console.error('Erro ao atualizar tarefa:', err);
      },
    });
  }

  /**
   * Navega de volta para a lista de tarefas.
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}

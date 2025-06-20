import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../Task';
import { TaskService } from '../../services/task';

/**
 * Componente responsável por exibir a lista de tarefas,
 * permitindo filtragem e navegação para outras ações.
 */
@Component({
  selector: 'app-task-list-component',
  standalone: true, // Indica que o componente é autônomo
  imports: [CommonModule, FormsModule], // Importa módulos necessários para o template
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array com todas as tarefas carregadas do backend
  filteredTasks: Task[] = []; // Array com as tarefas após a aplicação dos filtros
  isLoading = true; // Flag para controlar a exibição do indicador de carregamento
  error: string | null = null; // Mensagem de erro a ser exibida
  filter = {
    // Objeto que armazena os valores dos filtros
    grupo: '',
    completado: 'all' as 'all' | 'completed' | 'pending',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  /**
   * Método do ciclo de vida do Angular, chamado na inicialização do componente.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Carrega as tarefas do backend usando o TaskService.
   */
  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters(); // Aplica os filtros iniciais
        this.isLoading = false;
      },
      error: (err) => {
        this.error =
          'Falha ao carregar as tarefas. Por favor, tente novamente mais tarde.';
        this.isLoading = false;
        console.error('Erro ao buscar tarefas:', err);
      },
    });
  }

  /**
   * Filtra a lista de tarefas com base nos valores dos filtros de grupo e status.
   */
  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      // Verifica se o grupo da tarefa corresponde ao filtro (se o filtro não estiver vazio)
      const matchesGroup =
        !this.filter.grupo ||
        (task.grupo &&
          task.grupo.toLowerCase().includes(this.filter.grupo.toLowerCase()));

      // Verifica se o status de conclusão da tarefa corresponde ao filtro
      const matchesStatus =
        this.filter.completado === 'all' ||
        (this.filter.completado === 'completed' && task.completado) ||
        (this.filter.completado === 'pending' && !task.completado);

      return matchesGroup && matchesStatus;
    });
  }

  /**
   * Formata uma string de data para uma representação mais legível.
   * @param dateString A data a ser formatada.
   * @returns A data formatada ou '-' se a data for inválida/nula.
   */
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

  /**
   * Navega para a página de adição de nova tarefa.
   */
  openAdd() {
    this.router.navigate(['/task/new']);
  }

  /**
   * Navega para a página de edição de uma tarefa específica.
   * @param id O ID da tarefa a ser editada.
   */
  openEdit(id: string | number) {
    this.router.navigate(['/task/edit/' + id]);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Task';

/**
 * Serviço responsável por toda a comunicação com a API REST do backend
 * para gerenciar as tarefas.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // URL base da API de tarefas no backend.
  private apiUrl = 'http://localhost:8080/api/tasks';

  /**
   * Construtor do serviço.
   * @param http Instância do HttpClient injetada para fazer requisições HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Busca todas as tarefas do backend.
   * @returns Um Observable que emite um array de Tasks.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Busca uma tarefa específica pelo seu ID.
   * @param id O ID da tarefa a ser buscada.
   * @returns Um Observable que emite a Task correspondente.
   */
  getTaskById(id: string | number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /**
   * Atualiza uma tarefa existente no backend.
   * @param id O ID da tarefa a ser atualizada.
   * @param task O objeto Task com os dados atualizados.
   * @returns Um Observable que emite a Task atualizada.
   */
  updateTask(id: string | number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  /**
   * Cria uma nova tarefa no backend.
   * @param task O objeto Task a ser criado (sem o taskId).
   * @returns Um Observable que emite a Task recém-criada.
   */
  createTask(task: Omit<Task, 'taskId'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /**
   * Deleta uma tarefa no backend.
   * @param id O ID da tarefa a ser deletada.
   * @returns Um Observable<void> indicando a conclusão da operação.
   */
  deleteTask(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

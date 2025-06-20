/**
 * Interface que define a estrutura de dados para um objeto de Tarefa (Task).
 * Garante a consistência de tipos em toda a aplicação frontend.
 */
export interface Task {
  taskId: string | number; // Identificador único da tarefa
  grupo: string; // Grupo ou categoria da tarefa
  titulo: string; // Título da tarefa
  descricao: string; // Descrição detalhada da tarefa
  completado: boolean; // Status de conclusão da tarefa
  dataCriada?: string; // Data de criação (opcional no frontend, preenchida pelo backend)
  dataVencimento?: string; // Data de vencimento
  dataCompleta?: string | null; // Data de conclusão (pode ser nula)
}

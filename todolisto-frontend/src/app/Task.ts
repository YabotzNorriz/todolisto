export interface Task {
  task_id?: number;
  titulo: string;
  descricao: string;
  completado: boolean;
  dataCriada?: string;
  dataVencimento?: string;
  dataCompleta?: string;
}

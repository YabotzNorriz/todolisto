export interface Task {
  taskId: string | number;
  grupo: string;
  titulo: string;
  descricao: string;
  completado: boolean;
  dataCriada?: string;
  dataVencimento?: string;
  dataCompleta?: string | null;
}

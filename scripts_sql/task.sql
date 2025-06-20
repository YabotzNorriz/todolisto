-- Cria o banco de dados se ele ainda não existir
CREATE DATABASE IF NOT EXISTS todolisto_db;
-- Seleciona o banco de dados para uso nas próximas queries
USE todolisto_db;

-- Remove a tabela 'task' se ela já existir, para garantir uma criação limpa
DROP TABLE IF EXISTS task;

-- Cria a tabela 'task' que armazenará as tarefas
CREATE TABLE IF NOT EXISTS task  (
	task_id bigint NOT NULL AUTO_INCREMENT, -- Chave primária auto-incrementada
    grupo varchar(256) DEFAULT NULL, -- Grupo opcional para a tarefa
	titulo varchar(256) NOT NULL, -- Título da tarefa, obrigatório
    descricao text NOT NULL, -- Descrição detalhada da tarefa, obrigatória
    completado boolean NOT NULL DEFAULT FALSE, -- Status de conclusão (padrão: pendente)
    data_criada DATETIME NOT NULL DEFAULT current_timestamp, -- Data de criação, preenchida automaticamente
    data_vencimento DATETIME NOT NULL, -- Data de vencimento da tarefa, obrigatória
    data_completa DATETIME DEFAULT NULL, -- Data de conclusão, preenchida via trigger
    PRIMARY KEY (task_id) -- Define task_id como chave primária
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Se na inserção o "completado" for TRUE
DELIMITER $$
CREATE TRIGGER trg_task_insert_completed
BEFORE INSERT ON task
FOR EACH ROW
BEGIN
    IF NEW.completado = TRUE THEN
        SET NEW.data_completa = CURRENT_TIMESTAMP;
    END IF;
END$$
DELIMITER ;

-- Se em um update o completado for TRUE
DELIMITER $$
CREATE TRIGGER trg_task_update_completed
BEFORE UPDATE ON task
FOR EACH ROW
BEGIN
    IF NEW.completado = TRUE AND (OLD.completado = FALSE OR OLD.completado IS NULL) THEN
        SET NEW.data_completa = CURRENT_TIMESTAMP;
    ELSEIF NEW.completado = FALSE THEN
        SET NEW.data_completa = NULL;
    END IF;
END$$
DELIMITER ;

INSERT INTO task (grupo, titulo, descricao, data_vencimento)
VALUES (
    'Pessoal', 
    'Compras do Supermercado', 
    'Comprar itens essenciais para a casa: leite, ovos, pão, frutas', 
    '2023-12-05 19:00:00'
);

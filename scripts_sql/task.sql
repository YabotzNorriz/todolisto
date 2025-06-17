CREATE DATABASE IF NOT EXISTS todolisto_db;
USE todolisto_db;

DROP TABLE IF EXISTS task;
CREATE TABLE IF NOT EXISTS task  (
	task_id bigint NOT NULL AUTO_INCREMENT,
    grupo varchar(256) DEFAULT NULL,
	titulo varchar(256) NOT NULL,
    descricao text NOT NULL,
    completado boolean NOT NULL DEFAULT FALSE,
    data_criada DATETIME NOT NULL DEFAULT current_timestamp,
    data_vencimento DATETIME NOT NULL,
    data_completa DATETIME DEFAULT NULL,
    PRIMARY KEY (task_id)
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

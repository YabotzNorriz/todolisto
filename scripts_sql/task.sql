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
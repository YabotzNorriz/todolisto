package dev.yabotznorriz.todolisto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal que inicializa a aplicação Spring Boot.
 * A anotação @SpringBootApplication combina @Configuration, @EnableAutoConfiguration e @ComponentScan.
 */
@SpringBootApplication
public class TodolistoApplication {

	/**
	 * Ponto de entrada da aplicação.
	 * @param args Argumentos da linha de comando.
	 */
	public static void main(String[] args) {
		SpringApplication.run(TodolistoApplication.class, args);
	}

}

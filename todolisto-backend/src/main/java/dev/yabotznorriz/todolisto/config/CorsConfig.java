package dev.yabotznorriz.todolisto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Classe de configuração para o Cross-Origin Resource Sharing (CORS).
 * Permite que o frontend (rodando em http://localhost:4200) acesse a API do backend.
 */
@Configuration
public class CorsConfig {

    /**
     * Define as configurações de CORS para a aplicação.
     * @return Um WebMvcConfigurer com as regras de CORS.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Aplica as regras de CORS a todos os endpoints da API ("/**")
                registry.addMapping("/**")
                        // Permite requisições da origem do frontend Angular
                        .allowedOrigins("http://localhost:4200")
                        // Permite os métodos HTTP especificados
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                        // Permite todos os cabeçalhos na requisição
                        .allowedHeaders("*")
                        // Permite o envio de credenciais (como cookies)
                        .allowCredentials(true);
            }
        };
    }
}

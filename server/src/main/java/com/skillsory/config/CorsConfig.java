package com.skillsory.config;

    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

    import java.util.Arrays;
    import java.util.ArrayList;
    import java.util.List;

    @Configuration
    public class CorsConfig {

        @Value("${app.cors.allowed-origins:}")
        private String allowedOriginsProp;

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            List<String> origins = new ArrayList<>(Arrays.asList(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://skills-ory-client-kyj1ibi6n-santosh-singhs-projects-49514cff.vercel.app"
            ));
            if (allowedOriginsProp != null && !allowedOriginsProp.isBlank()) {
                origins.addAll(Arrays.asList(allowedOriginsProp.split(",")));
            }
            configuration.setAllowedOrigins(origins);
            
            // Allow specific methods
            configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
            ));
            
            // Allow specific headers
            configuration.setAllowedHeaders(Arrays.asList(
                "Authorization", 
                "Content-Type", 
                "X-Requested-With",
                "Accept",
                "Origin"
            ));
            
            // Allow credentials
            configuration.setAllowCredentials(true);
            
            // How long the browser can cache preflight requests
            configuration.setMaxAge(3600L);

            configuration.setAllowedOriginPatterns(Arrays.asList(
                "https://*.ngrok.io",
                "https://*.vercel.app"
            ));
            
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/api/**", configuration);
            
            return source;
        }
    }

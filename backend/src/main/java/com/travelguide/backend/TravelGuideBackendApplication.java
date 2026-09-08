package com.travelguide.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.travelguide")
@EntityScan(basePackages = "com.travelguide.model")
@EnableJpaRepositories(basePackages = "com.travelguide.repository")
public class TravelGuideBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelGuideBackendApplication.class, args);
    }

}

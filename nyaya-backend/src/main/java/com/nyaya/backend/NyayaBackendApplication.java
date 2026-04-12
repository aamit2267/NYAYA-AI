package com.nyaya.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class NyayaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(NyayaBackendApplication.class, args);
	}

}

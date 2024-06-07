package day37.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import day37.backend.service.PictureService;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	@Autowired
	PictureService svc;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		svc.initDirectory();
	}

}

package ibf2023.csf.day36.backend.controllers;

import java.io.StringReader;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonReader;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {

	@PostMapping(path="/projects", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<String> postProject(@RequestBody String payload) {
		JsonReader reader = Json.createReader(new StringReader(payload));
		JsonArray projects = reader.readArray();
		System.out.printf(">>> project: %s\n", projects.toString());

		return ResponseEntity.ok("{}");
	}
}

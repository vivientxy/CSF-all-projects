package ibf2023.csf.day35.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ibf2023.csf.day35.backend.models.GameComment;
import ibf2023.csf.day35.backend.models.GameDetail;
import ibf2023.csf.day35.backend.repositories.GamesRepository;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public class GamesController {

	@Autowired
	private GamesRepository gamesRepo;

	@GetMapping(path="/search")
	@ResponseBody
	public ResponseEntity<String> search(@RequestParam String q) {
		JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
		gamesRepo.findGamesByName(q).stream()
			.map(g -> Json.createObjectBuilder()
					.add("gameId", g.gameId())
					.add("name", g.name())
					.build())
			.forEach(j -> {
				arrBuilder.add(j);
			});
		return ResponseEntity.ok(arrBuilder.build().toString());
	}

	@GetMapping(path="/game/{gid}")
	@ResponseBody
	public ResponseEntity<String> getComments(@PathVariable Integer gid) {
		System.out.println(">>> printing from controller: " + gid);

		GameDetail g = gamesRepo.findDetailAndCommentsByGameId(gid);
		JsonArrayBuilder commentsArrBuilder = Json.createArrayBuilder();
		for (GameComment c : g.comments()) {
			JsonObjectBuilder objBuiler = Json.createObjectBuilder()
				.add("user", c.user())
				.add("rating", c.rating())
				.add("c_text", c.c_text());
			commentsArrBuilder.add(objBuiler);
		}
		JsonObjectBuilder j = Json.createObjectBuilder()
					.add("gid", g.gid())
					.add("name", g.name())
					.add("year", g.year())
					.add("url", g.url())
					.add("image", g.image())
					.add("comments", commentsArrBuilder);
		System.out.println(">>> printing from controller: " + j.build());
		return ResponseEntity.ok(j.build().toString());
	}
}

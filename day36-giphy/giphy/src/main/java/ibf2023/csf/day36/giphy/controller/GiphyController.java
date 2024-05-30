package ibf2023.csf.day36.giphy.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf2023.csf.day36.giphy.service.GiphyService;
import jakarta.json.Json;
import jakarta.json.JsonArray;

@RestController
@RequestMapping("/api")
public class GiphyController {

    private Logger logger = Logger.getLogger(GiphyController.class.getName());

    @Autowired
    private GiphyService svc;

    @GetMapping("/search")
    public ResponseEntity<String> getSearchResults(
            @RequestParam(required = true) String q,
            @RequestParam(defaultValue = "10") int limit) {
        
        logger.log(Level.INFO, "SEARCH: q=%s, limit=%d".formatted(q, limit));
        
        JsonArray result = Json.createArrayBuilder(svc.search(q, limit)).build();
        return new ResponseEntity<String>(result.toString(), HttpStatus.OK);
    }

}

package ibf2023.csf.day36.giphy.service;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class GiphyService {

    @Value("${giphy.key}")
    private String giphyKey;

    public static final String SEARCH_URL = "https://api.giphy.com/v1/gifs/search";

    public List<String> search(String q, int limit) {
        String url = UriComponentsBuilder
                .fromUriString(SEARCH_URL)
                .queryParam("api_key", giphyKey)
                .queryParam("q", q.replace(" ", "+"))
                .queryParam("limit", limit)
                .toUriString();

        // make the GET request
        RequestEntity<Void> req = RequestEntity
                .get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        // make the call
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> resp = restTemplate.exchange(req, String.class);

        List<String> gifUrls = new LinkedList<>();
        // process the response body
        JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
        JsonObject giphyResp = reader.readObject();
        JsonArray gifs = giphyResp.getJsonArray("data");
        for (int i = 0; i < gifs.size(); i++) {
            JsonObject gif = gifs.get(i).asJsonObject();
            JsonObject images = gif.getJsonObject("images");
            JsonObject fixedWidth = images.getJsonObject("fixed_height_small");
            String imgUrl = fixedWidth.getString("url");
            gifUrls.add(imgUrl);
        }
        return gifUrls;
    }

}

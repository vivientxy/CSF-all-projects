package day37.backend.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

import day37.backend.exceptions.ResponseMessage;
import day37.backend.model.FileInfo;
import day37.backend.model.Post;
import day37.backend.service.PictureService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
public class PictureController {

    @Autowired
    private PictureService svc;

    // return ResponseEntity
    @PostMapping(path = { "/postJson" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postPicture(@RequestPart String comments,
            @RequestPart MultipartFile picture) throws IOException {
        String postId = this.svc.saveToDB(picture.getInputStream(), comments);
        return new ResponseEntity<String>(postId, HttpStatus.OK);
    }

    // return MAV
    @PostMapping(path = { "/post" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ModelAndView postPictureToSQL(@RequestPart String comments, @RequestPart MultipartFile picture)
            throws IOException {
        ModelAndView mav = new ModelAndView("display");
        String postId = this.svc.saveToDB(picture.getInputStream(), comments);
        mav.addObject("postId", postId);
        mav.addObject("comments", comments);
        mav.addObject("pic", picture.getInputStream().toString());
        return mav;
    }

    // get Post from SQL
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable String postId) {
        Optional<Post> resultPost = svc.getPicById(postId);

        if (resultPost.isPresent())
            return ResponseEntity.ok().body(resultPost.get());
        else
            return ResponseEntity.ok().body(null);
    }
    
    // get Post from S3
    @GetMapping("/S3/{fileId}")
    public ResponseEntity<byte[]> getPostByIdFromS3(@PathVariable String fileId) {
        S3Object result = svc.getFileFromS3(fileId);

        if (result == null)
            return ResponseEntity.ok().body(null);

        ObjectMetadata metadata= result.getObjectMetadata();
        Map<String, String> userData = metadata.getUserMetadata();
        try (S3ObjectInputStream is = result.getObjectContent()) {
            byte[] buffer = is.readAllBytes();
            return ResponseEntity.status(HttpStatus.OK)
                .contentLength(result.getObjectMetadata().getContentLength())
                .contentType(MediaType.parseMediaType(result.getObjectMetadata().getContentType()))
                .header("X-name", userData.get("name"))
                .body(buffer);
        } catch (AmazonS3Exception ex) {
            ex.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    // save to S3, return MAV
    @PostMapping(path = { "/S3/upload2" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ModelAndView postPictureToS3ReturnMav(@RequestPart MultipartFile picture)
            throws IOException {
        ModelAndView mav = new ModelAndView("display");

        String imageUrl = this.svc.saveToS3(picture);

        mav.addObject("postId", imageUrl.substring(imageUrl.length() - 8));
        mav.addObject("pic", imageUrl);
        return mav;
    }

    // save to S3, return ResponseEntity
    @PostMapping(path = { "/S3/upload" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postPictureToS3(@RequestPart MultipartFile picture)
            throws IOException {
        String imageUrl = this.svc.saveToS3(picture);
        JsonObject json = Json.createObjectBuilder()
                .add("url", imageUrl)
                .build();
        return new ResponseEntity<String>(json.toString(), HttpStatus.OK);
    }

    // ADDITIONAL:
    // save to local folder
    @PostMapping(path = { "/postlocal" })
    public ResponseEntity<ResponseMessage> postPictureToLocalFolder(@RequestBody MultipartFile picture) {
        try {
            this.svc.saveToLocalFolder(picture);
            String message = "File uploaded successfully";
            return ResponseEntity.ok(new ResponseMessage(message));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Error"));
        }
    }

    // @GetMapping("/list-files")
    public ResponseEntity<List<String>> getFilesListReturnString() throws IOException {
        List<String> fileInfos = this.svc.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            return filename;
            }).collect(Collectors.toList());
        return new ResponseEntity<List<String>>(fileInfos, HttpStatus.OK);
    }

    // get file URLs (to pump into img in html)
    @GetMapping("/list-files")
    public ResponseEntity<List<FileInfo>> getFilesList() throws IOException {
        List<FileInfo> fileInfos = this.svc.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(PictureController.class, "getFileByFilename", path.getFileName().toString())
                    .build().toString();
            return new FileInfo(filename, url);
        }).collect(Collectors.toList());
        return new ResponseEntity<List<FileInfo>>(fileInfos, HttpStatus.OK);
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<Resource> getFileByFilename(@PathVariable String filename) throws MalformedURLException {
        Resource resource = this.svc.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment, filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}

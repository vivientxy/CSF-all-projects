package tfip.day37.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class UploadService {
    
    @Autowired
    private AmazonS3 s3;

    public String upload(MultipartFile file) throws IOException {
        // user metadata (anything you want, as long as it's string)
        Map<String,String> userData = new HashMap<>();
        userData.put("upload-timestamp", (new Date()).toString());
        userData.put("name", "viv");
        userData.put("filename", file.getOriginalFilename());

        // object metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        metadata.setUserMetadata(userData);

        String key = UUID.randomUUID().toString().substring(0, 8); // filename when uploaded
        PutObjectRequest putReq = new PutObjectRequest("day37", key, file.getInputStream(), metadata);

        // control access rights of the uploaded object
        putReq.withCannedAcl(CannedAccessControlList.PublicRead);

        s3.putObject(putReq);

        return s3.getUrl("day37", key).toString();
    }

}

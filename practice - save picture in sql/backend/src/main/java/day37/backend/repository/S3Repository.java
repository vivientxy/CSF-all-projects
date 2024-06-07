package day37.backend.repository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

@Repository
public class S3Repository {

    @Autowired
    AmazonS3 s3;

    public String saveToS3(MultipartFile uploadFile) throws IOException {

        Map<String, String> userData = new HashMap<>();
        userData.put("name", "viv");
        userData.put("filename", uploadFile.getOriginalFilename());

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(uploadFile.getContentType());
        metadata.setContentLength(uploadFile.getSize());
        metadata.setUserMetadata(userData);

        String id = UUID.randomUUID().toString().substring(0, 8);
        PutObjectRequest putRequest = new PutObjectRequest("tfip-viv-day38", id, uploadFile.getInputStream(), metadata);
        putRequest.withCannedAcl(CannedAccessControlList.PublicRead);

        s3.putObject(putRequest);

        return s3.getUrl("tfip-viv-day38", id).toString();
    }

    public S3Object getFileFromS3(String fileId) {
        try {
            GetObjectRequest getRequest = new GetObjectRequest("tfip-viv-day38", fileId);
            S3Object result = s3.getObject(getRequest);
            return result;
        } catch (Exception e) {
            return null;
        }
    }

}

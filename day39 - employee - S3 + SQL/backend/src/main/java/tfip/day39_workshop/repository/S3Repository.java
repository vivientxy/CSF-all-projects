package tfip.day39_workshop.repository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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

    public static final String S3_BUCKET = "tfip-viv-day39";

    public String saveToS3(MultipartFile uploadFile, String email) throws IOException {
        Map<String, String> userData = new HashMap<>();
        userData.put("name", "viv");
        userData.put("filename", uploadFile.getOriginalFilename());

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(uploadFile.getContentType());
        metadata.setContentLength(uploadFile.getSize());
        metadata.setUserMetadata(userData);

        PutObjectRequest putRequest = new PutObjectRequest(S3_BUCKET, email, uploadFile.getInputStream(), metadata);
        putRequest.withCannedAcl(CannedAccessControlList.PublicRead);

        s3.putObject(putRequest);

        return s3.getUrl(S3_BUCKET, email).toString();
    }

    public S3Object getFileFromS3(String fileId) {
        try {
            GetObjectRequest getRequest = new GetObjectRequest(S3_BUCKET, fileId);
            S3Object result = s3.getObject(getRequest);
            return result;
        } catch (Exception e) {
            return null;
        }
    }

}

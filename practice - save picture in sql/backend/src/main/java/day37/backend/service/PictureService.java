package day37.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.S3Object;

import day37.backend.model.Post;
import day37.backend.repository.PictureRepository;
import day37.backend.repository.S3Repository;

@Service
public class PictureService {

    @Autowired
    PictureRepository repo;

    @Autowired
    S3Repository s3repo;

    public String saveToDB(InputStream is, String comments) {
        String postId = UUID.randomUUID().toString().substring(0, 8);
        repo.save(postId, comments, is);
        return postId;
    }

    public String saveToS3(MultipartFile file) throws IOException {
        return s3repo.saveToS3(file);
    }

    public Optional<Post> getPicById(String postId) {
        return this.repo.getPostById(postId);
    }

    public S3Object getFileFromS3(String fileId) {
        return this.s3repo.getFileFromS3(fileId);
    }

    // Additional: upload files and save to a local directory "uploads" within the application
    public final Path fileUpload = Paths.get("uploads");

    public void initDirectory() {
        try {
            Files.createDirectories(fileUpload);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void saveToLocalFolder(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.fileUpload.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Stream<Path> loadAll() throws IOException {
        return Files.walk(this.fileUpload, 1)
            .filter(path -> !path.equals(this.fileUpload))
            .map(this.fileUpload::relativize);
    }

    public Resource loadFile(String filename) throws MalformedURLException {
        Path file = this.fileUpload.resolve(filename);
        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() || resource.isReadable())
            return resource;
        else
            throw new RuntimeException("Problem reading from file...");
    }

    public void deleteAllFiles() {
        FileSystemUtils.deleteRecursively(fileUpload.toFile());
    }
    
}

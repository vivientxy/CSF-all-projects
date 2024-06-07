package day37.backend.repository;

import java.io.InputStream;
import java.sql.ResultSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import day37.backend.model.Post;

@Repository
public class PictureRepository implements Queries {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public void save(String postId, String comments, InputStream is) {
        jdbcTemplate.update(SQL_ADD_PICTURE, postId, comments, is);
    }

    public Optional<Post> getPostById(String postId) {
        return jdbcTemplate.query(SQL_GET_PICTURE, (ResultSet rs) -> {
            if (!rs.next())
                return Optional.empty();
            Post post = new Post(rs.getString("post_id"), rs.getString("comments"), rs.getBytes("picture"));
            return Optional.of(post);
        }, postId);
    }

    // public boolean addPost(String postId, String comments, byte[] picture) {
    //     try {
    //         ByteArrayInputStream bis = new ByteArrayInputStream(picture);
            
    //         return true;
    //     } catch (DuplicateKeyException e) {
    //         return false;
    //     }
    // }

    // public boolean addPost(Post post) {
    //     try {
    //         jdbcTemplate.update(SQL_ADD_PICTURE, post.getPostId(), post.getComments(), post.getPicture());
    //         return true;
    //     } catch (DuplicateKeyException e) {
    //         return false;
    //     }
    // }

}

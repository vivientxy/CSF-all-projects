package day37.backend.repository;

public interface Queries {
    public static final String SQL_ADD_PICTURE = """
            INSERT INTO posts(post_id, comments, picture) VALUES (?,?,?)
            """;
    public static final String SQL_GET_PICTURE = """
            SELECT *
            FROM feeds.posts
            WHERE post_id = ?
            """;
}

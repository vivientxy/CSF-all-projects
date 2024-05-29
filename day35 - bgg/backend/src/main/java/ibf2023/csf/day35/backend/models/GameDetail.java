package ibf2023.csf.day35.backend.models;

public record GameDetail(
    Integer gid,
    String name,
    Integer year,
    String url,
    String image,
    GameComment[] comments
) { }
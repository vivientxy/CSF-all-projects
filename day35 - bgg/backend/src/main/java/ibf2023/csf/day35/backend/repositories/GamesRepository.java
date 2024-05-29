package ibf2023.csf.day35.backend.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf2023.csf.day35.backend.models.*;

@Repository
public class GamesRepository {

	@Autowired
	private MongoTemplate template;

	public List<GameSummary> findGamesByName(String name) {
		Criteria criteria = Criteria.where("name").regex(name, "i");
		Query query = Query.query(criteria);
		query.fields().include("gid", "name");
		return template.find(query, Document.class, "games").stream()
			.map(doc -> new GameSummary(
						doc.getInteger("gid", 0), doc.getString("name"))
			).toList();

	}

	/*
	 * db.games.aggregate([
		{$match: {gid:45315}},
		{$lookup: {
			from: "comments",
			foreignField: "gid",
			localField:"gid",
			pipeline: [
				{$sort: {rating:-1}},
				{$limit: 5},
				{$project: {_id:0,user:1,rating:1,c_text:1}}
			],
			as: "comments"
		}},
		{$project: {_id:0, gid:1, name:1, year:1, url:1, image:1, comments:1}}
		]);
	 */
	public GameDetail findDetailAndCommentsByGameId(Integer gid) {
        MatchOperation match = Aggregation.match(Criteria.where("gid").is(gid));
        LookupOperation lookup = Aggregation.lookup()
                .from("comments")
                .localField("gid")
                .foreignField("gid")
                .pipeline(
                    Aggregation.sort(Sort.by(Direction.DESC, "rating")),
                    Aggregation.limit(5),
                    Aggregation.project("user","rating","c_text").andExclude("_id"))
                .as("comments");
        ProjectionOperation project = Aggregation.project("gid", "name", "year", "url", "image", "comments")
				.andExclude("_id");

        Aggregation pipeline= Aggregation.newAggregation(match,lookup,project);
        AggregationResults<GameDetail> results= template.aggregate(pipeline, "games", GameDetail.class);
        return results.getMappedResults().get(0);
	}
}

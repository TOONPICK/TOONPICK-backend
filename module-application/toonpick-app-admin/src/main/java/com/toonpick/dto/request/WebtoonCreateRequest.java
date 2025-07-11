package com.toonpick.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.toonpick.domain.webtoon.enums.AgeRating;
import com.toonpick.domain.webtoon.enums.Platform;
import com.toonpick.domain.webtoon.enums.SerializationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Builder
public class WebtoonCreateRequest {

    @JsonProperty("title")
    private String title;

    @JsonProperty("external_id")
    private String externalId;

    @JsonProperty("platform")
    private Platform platform;

    @JsonProperty("day_of_week")
    private DayOfWeek dayOfWeek;

    @JsonProperty("thumbnail_url")
    private String thumbnailUrl;

    @JsonProperty("link")
    private String link;

    @JsonProperty("age_rating")
    private AgeRating ageRating;

    @JsonProperty("description")
    private String summary;

    @JsonProperty("serialization_status")
    private SerializationStatus serializationStatus;

    @JsonProperty("episode_count")
    private int episodeCount;

    @JsonProperty("platform_rating")
    private float platformRating;

    @JsonProperty("publish_start_date")
    private LocalDate publishStartDate;

    @JsonProperty("last_updated_date")
    private LocalDate lastUpdatedDate;

    @JsonProperty("authors")
    private Set<AuthorRequest> authors;

    @JsonProperty("genres")
    private Set<String> genres;
}

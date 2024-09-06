package com.ktb.demo.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@ToString
@Document(collection = "problem_sets")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProblemSet {

    @Id
    private String id;

    private int count;
    private List<Problem> problems;
    private List<String> categories;

    @Builder
    public ProblemSet(int count, List<Problem> problems, List<String> categories) {
        this.count = count;
        this.problems = problems;
        this.categories = categories;
    }
}

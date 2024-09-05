package com.ktb.demo.entity;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "problem_sets")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProblemSet {

    @Id
    private String id;

    private int count;
    private List<Problem> problems;

    @Builder
    public ProblemSet(int count, List<Problem> problems) {
        this.count = count;
        this.problems = problems;
    }
}

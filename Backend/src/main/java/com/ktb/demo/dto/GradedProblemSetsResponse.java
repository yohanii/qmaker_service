package com.ktb.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GradedProblemSetsResponse {

    private int count;
    private List<GradedProblemDto> results;

    public static GradedProblemSetsResponse of(List<GradedProblemDto> gradedProblemDtos) {
        return new GradedProblemSetsResponse(gradedProblemDtos.size(), gradedProblemDtos);
    }
}

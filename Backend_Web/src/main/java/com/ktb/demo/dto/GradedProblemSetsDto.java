package com.ktb.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GradedProblemSetsDto {

    private int count;
    private List<String> categories;
    private List<GradedProblemDto> results;
    private int scoreTotal;
    private Map<String, Integer> score;

}

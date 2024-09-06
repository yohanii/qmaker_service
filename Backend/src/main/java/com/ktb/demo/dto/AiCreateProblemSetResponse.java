package com.ktb.demo.dto;

import lombok.*;

import java.util.List;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiCreateProblemSetResponse {

    private int count;
    private List<String> categories;
    private List<ProblemDto> problems;

}

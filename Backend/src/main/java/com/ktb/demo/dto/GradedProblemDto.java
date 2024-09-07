package com.ktb.demo.dto;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GradedProblemDto {

    private boolean correct;
    private int answer;
    private String explanation;
    private String category;

}

package com.ktb.demo.dto;

import lombok.*;

import java.util.List;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemDto {

    private String question;
    private List<String> options;
    private int answer;
    private String explanation;
    private String category;

}

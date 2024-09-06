package com.ktb.demo.entity;

import com.ktb.demo.dto.ProblemDto;
import lombok.*;

import java.util.List;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Problem {

    private String question;
    private List<String> options;
    private int answer;
    private String explanation;
    private String category;

    @Builder
    public Problem(String question, List<String> options, int answer, String explanation, String category) {
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.explanation = explanation;
        this.category = category;
    }

    public static Problem of(ProblemDto problemDto) {

        return Problem.builder()
                .question(problemDto.getQuestion())
                .options(problemDto.getOptions())
                .answer(problemDto.getAnswer())
                .explanation(problemDto.getExplanation())
                .category(problemDto.getCategory())
                .build();
    }
}

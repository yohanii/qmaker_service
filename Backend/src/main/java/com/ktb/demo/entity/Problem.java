package com.ktb.demo.entity;

import com.ktb.demo.dto.ProblemDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Problem {

    private String question;
    private List<String> options;
    private int answer;
    private String explanation;

    @Builder
    public Problem(String question, List<String> options, int answer, String explanation) {
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.explanation = explanation;
    }

    public static Problem of(ProblemDto problemDto) {

        return Problem.builder()
                .question(problemDto.getQuestion())
                .options(problemDto.getOptions())
                .answer(problemDto.getAnswer())
                .explanation(problemDto.getExplanation())
                .build();
    }
}

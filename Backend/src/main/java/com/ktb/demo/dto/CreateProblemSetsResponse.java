package com.ktb.demo.dto;

import com.ktb.demo.entity.ProblemSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProblemSetsResponse {
    private String id;
    private int count;
    private List<QuestionDTO> problems;


    public static CreateProblemSetsResponse of(ProblemSet problemSet) {
        List<QuestionDTO> questions = problemSet.getProblems().stream()
                .map(p -> new QuestionDTO(p.getQuestion(),p.getOptions()))
                .toList();

        return new CreateProblemSetsResponse(
                problemSet.getId(),
                problemSet.getCount(),
                questions
        );
    }
}

@Getter
@Setter
@AllArgsConstructor
class QuestionDTO {
    private String question;
    private List<String> options;
}

;
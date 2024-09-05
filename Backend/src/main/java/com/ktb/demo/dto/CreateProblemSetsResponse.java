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
public class CreateProblemSetsResponse {
    private int id;
    private int count;
    private List<ProblemDTO> problems;


    public static void of(String question, List<String> options) {
        ProblemDTO problems = new ProblemDTO(question, options);
        int count = options.size();
        int id = 0;
        //return new CreateProblemSetsResponse();
    }
}

class ProblemDTO {
    private String question;
    private List<String> options;

    public ProblemDTO(String question, List<String> options) {
        this.question = question;
        this.options = options;
    }
}

;
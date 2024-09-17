package com.ktb.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
class QuestionDto {

    private String question;
    private List<String> options;

}

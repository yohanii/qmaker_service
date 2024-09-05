package com.ktb.demo.controller;


import com.ktb.demo.dto.CreateProblemSetsResponse;
import com.ktb.demo.entity.ProblemSet;
import com.ktb.demo.service.ProblemSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CreateProblemController {

    private final ProblemSetService problemSetService;

    @PostMapping("/problem-sets")
    public ResponseEntity<CreateProblemSetsResponse> createProblemSetsResponse(@RequestBody String note){

        ProblemSet problemSet = problemSetService.save(note);

        return ResponseEntity.ok(CreateProblemSetsResponse.of(problemSet));
    }
}

package com.ktb.demo.controller;


import com.ktb.demo.dto.CreateProblemSetsResponse;
import com.ktb.demo.dto.GradedProblemSetsResponse;
import com.ktb.demo.entity.ProblemSet;
import com.ktb.demo.service.CreateProblemSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class ProblemController {

    private final CreateProblemSetService createProblemSetService;

    @PostMapping("/problem-sets")
    public ResponseEntity<CreateProblemSetsResponse> createProblemSetsResponse(@RequestBody String note){

        ProblemSet problemSet = createProblemSetService.save(note);

        return ResponseEntity.ok(CreateProblemSetsResponse.of(problemSet));
    }

    @GetMapping("/problem-sets/{problemSetId}/solved")
    public ResponseEntity<GradedProblemSetsResponse> gradingProblemSet(@PathVariable String problemSetId, @RequestParam String answers){

        return null;

//        return ResponseEntity.ok("");
    }
}

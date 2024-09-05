package com.ktb.demo.controller;

import com.ktb.demo.entity.TestInfo;
import com.ktb.demo.service.ProblemSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProblemSetController {

    private final ProblemSetService problemSetService;

    @PostMapping("/test-db")
    public TestInfo testDb() {
        return problemSetService.save();
    }
}

package com.ktb.demo.service;

import com.ktb.demo.dto.AiCreateProblemSetRequest;
import com.ktb.demo.dto.AiCreateProblemSetResponse;
import com.ktb.demo.entity.Problem;
import com.ktb.demo.entity.ProblemSet;
import com.ktb.demo.feign.AiClient;
import com.ktb.demo.repository.ProblemSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemSetService {

    private final ProblemSetRepository problemSetRepository;
    private final AiClient aiClient;
    private final MongoTemplate mongoTemplate;

    public ProblemSet save(String note) {

        AiCreateProblemSetResponse response = aiClient.generateProblemSet(new AiCreateProblemSetRequest(note));

        List<Problem> problems = response.getProblems().stream()
                .map(Problem::of)
                .toList();

        return problemSetRepository.save(ProblemSet.builder()
                .count(response.getCount())
                .problems(problems)
                .build()
        );
    }

}

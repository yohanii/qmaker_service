package com.ktb.demo.service;

import com.ktb.demo.dto.GradedProblemDto;
import com.ktb.demo.repository.ProblemSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GradingProblemSetService {

    private final ProblemSetRepository problemSetRepository;
    private final MongoTemplate mongoTemplate;

    public List<GradedProblemDto> gradeProblemSet(String problemSetId, String answers) {
        return new ArrayList<>();
    }

}

package com.ktb.demo.service;

import com.ktb.demo.dto.GradedProblemDto;
import com.ktb.demo.entity.ProblemSet;
import com.ktb.demo.repository.ProblemSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class GradingProblemSetService {

    private final ProblemSetRepository problemSetRepository;
    private final MongoTemplate mongoTemplate;

    public List<GradedProblemDto> gradeProblemSet(String problemSetId, String answers) {

        List<Integer> userAnswers = splitEachAnswers(answers);

        ProblemSet findProblemSet = problemSetRepository.findById(problemSetId)
                .orElseThrow(() -> new NoSuchElementException("ProblemSet with id " + problemSetId + " not found"));

        AtomicInteger index = new AtomicInteger();
        return findProblemSet.getProblems().stream()
                .map(problem -> new GradedProblemDto(
                        problem.getAnswer() == userAnswers.get(index.getAndIncrement()),
                        problem.getAnswer(),
                        problem.getExplanation())
                )
                .toList();
    }

    private static List<Integer> splitEachAnswers(String answers) {
        return Arrays.stream(answers.split(","))
                .map(String::trim)
                .map(Integer::parseInt)
                .toList();
    }

}

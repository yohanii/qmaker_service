package com.ktb.demo.service;

import com.ktb.demo.dto.GradedProblemDto;
import com.ktb.demo.dto.GradedProblemSetsDto;
import com.ktb.demo.entity.Problem;
import com.ktb.demo.entity.ProblemSet;
import com.ktb.demo.repository.ProblemSetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

import static java.util.stream.Collectors.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class GradingProblemSetService {

    private final ProblemSetRepository problemSetRepository;
    private final MongoTemplate mongoTemplate;

    public GradedProblemSetsDto gradeProblemSet(String problemSetId, String answers) {

        List<Integer> userAnswers = splitEachAnswers(answers);

        ProblemSet findProblemSet = problemSetRepository.findById(problemSetId)
                .orElseThrow(() -> new NoSuchElementException("ProblemSet with id " + problemSetId + " not found"));

        List<Problem> problems = findProblemSet.getProblems();

        int scoreTotal = calculateScoreTotal(problems, userAnswers);
        log.info("scoreTotal = {}", scoreTotal);

        Map<String, Integer> score = calculateScorePerCategory(problems, userAnswers, findProblemSet.getCategories());
        log.info("score = {}", score);

        List<GradedProblemDto> results = getResults(problems, userAnswers);
        log.info("results = {}", results);

        return new GradedProblemSetsDto(problems.size(), findProblemSet.getCategories(), results, scoreTotal, score);
    }

    private static List<GradedProblemDto> getResults(List<Problem> problems, List<Integer> userAnswers) {

        AtomicInteger index = new AtomicInteger();
        return problems.stream()
                .map(problem -> new GradedProblemDto(
                        problem.getAnswer() == userAnswers.get(index.getAndIncrement()),
                        problem.getAnswer(),
                        problem.getExplanation(),
                        problem.getCategory()
                        )
                )
                .toList();
    }

    private static Map<String, Integer> calculateScorePerCategory(List<Problem> problems, List<Integer> userAnswers, List<String> categories) {

        Map<String, Long> problemsCountPerCategory = problems.stream()
                .collect(groupingBy(Problem::getCategory, counting()));

        Map<String, Integer> scoreCounts = new HashMap<>();
        for (String category : categories) {
            scoreCounts.put(category, 0);
        }

        for (int index = 0; index < problems.size(); index++) {
            Problem problem = problems.get(index);
            if (problem.getAnswer() == userAnswers.get(index)) {
                scoreCounts.put(problem.getCategory(), scoreCounts.getOrDefault(problem.getCategory(), 0) + 1);
            }
        }

        return scoreCounts.keySet().stream()
                .collect(toMap(key -> key, key -> (int) (scoreCounts.get(key) * 100 / problemsCountPerCategory.get(key))));
    }

    private static int calculateScoreTotal(List<Problem> problems, List<Integer> userAnswers) {

        AtomicInteger answerIndex = new AtomicInteger();
        return (int) problems.stream()
                .map(problem -> problem.getAnswer() == userAnswers.get(answerIndex.getAndIncrement()))
                .filter(tf -> tf)
                .count();
    }

    private static List<Integer> splitEachAnswers(String answers) {
        return Arrays.stream(answers.split(","))
                .map(String::trim)
                .map(Integer::parseInt)
                .toList();
    }

}

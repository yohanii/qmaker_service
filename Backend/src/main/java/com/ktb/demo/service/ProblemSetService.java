package com.ktb.demo.service;

import com.ktb.demo.entity.TestInfo;
import com.ktb.demo.repository.ProblemSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProblemSetService {

    private final ProblemSetRepository problemSetRepository;
    private final MongoTemplate mongoTemplate;

    public TestInfo save() {
        return problemSetRepository.save(new TestInfo("1", "test1"));
    }

    public Optional<TestInfo> findById(String id) {
        return problemSetRepository.findById(id);
    }

}

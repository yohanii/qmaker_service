package com.ktb.demo.repository;

import com.ktb.demo.entity.ProblemSet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemSetRepository extends MongoRepository<ProblemSet, String> {
}

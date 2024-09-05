package com.ktb.demo.service;

import com.ktb.demo.dto.AiCreateProblemSetResponse;
import com.ktb.demo.dto.ProblemDto;
import com.ktb.demo.entity.Problem;
import com.ktb.demo.entity.ProblemSet;
import com.ktb.demo.repository.ProblemSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemSetService {

    private final ProblemSetRepository problemSetRepository;
    private final MongoTemplate mongoTemplate;

    public ProblemSet save(String note) {

        //openFeign client 사용해 response 받기
        ProblemDto dto1 = new ProblemDto(
                "컴퓨터 관련 과목이 아닌 것은?",
                List.of("운영체제", "말하기듣기쓰기", "CS입문", "자료구조"),
                1,
                "말하기듣기쓰기는 국어 과목입니다.");
        ProblemDto dto2 = new ProblemDto(
                "이진 탐색 트리 (Binary Search Tree) 의 특징이 아닌 것은 무엇인가요?",
                List.of("왼쪽 서브트리의 모든 노드는 부모 노드보다 작다.", "오른쪽 서브트리의 모든 노드는 부모 노드보다 크다.", "중복된 값을 허용하지 않는다.", "노드의 모든 자식은 크기에 관계없이 무작위로 배치된다."),
                3,
                "이진 탐색 트리에서는 노드의 값에 따라 자식 노드가 왼쪽(작은 값)과 오른쪽(큰 값)으로 배치되므로, 무작위 배치는 옳지 않은 설명입니다.");
        AiCreateProblemSetResponse response = new AiCreateProblemSetResponse(2, List.of(dto1, dto2));

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

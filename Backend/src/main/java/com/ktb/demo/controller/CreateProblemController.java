package com.ktb.demo.controller;


import com.ktb.demo.dto.CreateProblemSetsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CreateProblemController {

    @PostMapping("/problem-sets")
    public ResponseEntity<CreateProblemSetsResponse> createProblemSetsResponse(@RequestBody String note){
        // note 데이터 service에 보내고
        // 받아서 DTO 만들어서 return
        CreateProblemSetsResponse response = new CreateProblemSetsResponse();
        return ResponseEntity.ok(response);
    }
}

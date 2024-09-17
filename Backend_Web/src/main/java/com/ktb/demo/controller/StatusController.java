package com.ktb.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping("/health")
    public ResponseEntity<String> checkHealth(){
        return ResponseEntity.ok(null);
    }
}

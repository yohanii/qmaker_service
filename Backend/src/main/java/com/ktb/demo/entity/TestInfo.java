package com.ktb.demo.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tests")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestInfo {

    @Id
    private String id;
    private String name;
}

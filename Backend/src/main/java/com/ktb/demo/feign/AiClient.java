package com.ktb.demo.feign;

import com.ktb.demo.dto.AiCreateProblemSetRequest;
import com.ktb.demo.dto.AiCreateProblemSetResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "AiServer", url = "${AI_SERVICE_URL}")
public interface AiClient {

    @PostMapping("/problem-sets")
    AiCreateProblemSetResponse generateProblemSet(@RequestBody AiCreateProblemSetRequest request);

}

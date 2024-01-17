package com.srmpjt.boardback.prop;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "com.srmpjt.boardback")
public class JwtProps {
    private String secretKey;
}

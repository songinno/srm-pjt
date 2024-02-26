package com.srmpjt.boardback.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.srmpjt.boardback.prop.JwtProps;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {
    // 시크릿키 가져오기
    private final JwtProps jwtProps;

    // ! JWT 생성
    public String create(String email) {
        String secretKey = jwtProps.getSecretKey();
        log.info("secretKey: " + secretKey);
        // 만료 기간 : 1시간
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                // JwtBuilder signWith(SignatureAlgorithm alg, String base64EncodedSecretKey);
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .setSubject(email)
                .setIssuedAt(new Date()) // 생성일
                .setExpiration(expiredDate) // 만료일
                .compact();

        return jwt;
    }

    // ! JWT 검증
    public String validate(String jwt) {
        String secretKey = jwtProps.getSecretKey();
        Claims claims = null;

        try {
            claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return claims.getSubject();
    }
}

package com.srmpjt.boardback.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.srmpjt.boardback.constants.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.srmpjt.boardback.provider.JwtProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    // @RequiredArgsConstructor에 의해 DI 생성자 주입 자동으로 됨
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
    }

    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader(Token.HEADER.text);

        boolean hasAuthorization = StringUtils.hasText(authorization); // StringUtils.hasText : null, 공백, 0일 경우 false 반환
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith(Token.PREFIX.text);
        if (!isBearer) return null;

        // 토큰값 전처리
        String token = authorization.replace(Token.PREFIX.text, "");
        return token;
    }
}

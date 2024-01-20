package com.srmpjt.boardback.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.srmpjt.boardback.constants.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
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
        try {
            String token = parseBearerToken(request);

            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.validate(token);
            if (email == null) {
                filterChain.doFilter(request, response);
                return;
            }

            AbstractAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES); // 이메일, 비밀번호, 권한
            // 인증 요청에 대한 세부 정보 설정
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Context에 등록
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext(); // 비어있는 Context 생성
            securityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(securityContext); // 외부에서 사용할 수 있도록
        } catch (Exception e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
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

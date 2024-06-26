package com.srmpjt.boardback.config;

import com.srmpjt.boardback.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configurable // 특정 도메인 객체에 대해 DI를 위한 어노테이션
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // ! CORS 정책 (CorsConfig.java에서 별도 처리)
                .cors().and()
                // ! CSRF
                .csrf().disable()
                // ! 기본 로그인창 없애기
                .httpBasic().disable()
                // ! 세션 기반 인증 사용X
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // ! 인증 및 인가 관련 설정
                .authorizeRequests()
                    // # 지정한 패턴에 매칭되는 것들은 모두 허용(인증X)
                    // -> API 명세서에서 Header에 Authrization이 없는 것들을 설정 + file
                    .antMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/file/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/api/v1/board/**", "/api/v1/user/*", "/api/v1/statistics/*").permitAll()
                    .antMatchers(HttpMethod.PATCH, "/api/v1/board/**").permitAll() // # 조회 수 카운트업 요청
                    .anyRequest().authenticated().and() // # 지정하지 않은 나머지 매핑에 대해 모두 인증을 거치도록 설정
                    // # 인증 및 인가 오류 설정 (인가는 front-end에서 처리)
                    .exceptionHandling()
                        .authenticationEntryPoint(new FailedAuthenticationEntryPoint()); // # 인증 실패한 경우 적용
        // ! Filter 적용
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// ! 인증 실패한 경우
class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("{ \" code\": \"NP\", \"message\": \"Do not have permission.\" }");
    }
}

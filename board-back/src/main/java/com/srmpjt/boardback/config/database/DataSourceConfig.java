package com.srmpjt.boardback.config.database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.autoconfigure.batch.BatchDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    /*
    * [ LazyConnectionDataSourceProxy ]
    * - 트랜잭션 시작 시, DataSource의 Connection 사용 여부와 관계 없이, 모든 connetion을 확보
    *   -> 불필요한 리소스 발생
    * - 이를 줄이기 위해 LazyConnectionDataSourceProxy로 wrapping
    *   -> 실제 커넥션이 필요한 경우에만 DataSource에서 connection을 반환
    * => Multi DataSource 설정 시 유용함
    * */

    // * Main
    @Bean
    @ConfigurationProperties("spring.datasource.default")
    public HikariConfig mainHikariConfig() {
        return new HikariConfig();
    }

    @Primary
    @Bean(name = "dataSource")
    public DataSource mainDataSource() {
        return new LazyConnectionDataSourceProxy(new HikariDataSource(mainHikariConfig()));
    }

    // * Batch
    @Bean
    @ConfigurationProperties("spring.datasource.batch")
    public HikariConfig batchHikariConfig() {
        return new HikariConfig();
    }

    @BatchDataSource // # Spring Batch의 Meta 정보를 저장할 데이터소스로 지정
    @Bean
    public DataSource batchDataSource() {
        return new LazyConnectionDataSourceProxy(new HikariDataSource(batchHikariConfig()));
    }

    // * Statistics
    @Bean
    @ConfigurationProperties("spring.datasource.statistics")
    public HikariConfig statisticsHikariConfig() {
        return new HikariConfig();
    }

    @Bean
    DataSource statisticsDataSource() {
        return new LazyConnectionDataSourceProxy(new HikariDataSource(statisticsHikariConfig()));
    }
}

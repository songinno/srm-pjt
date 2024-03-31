package com.srmpjt.boardback.config;

import com.srmpjt.boardback.entity.SearchLogEntity;
import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.database.orm.JpaNativeQueryProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;

    // * 한 번에 처리할 Item 개수
    private int pageSize = 10;



    // * 인기검색어 TOP 10 - ItemReader
    @Bean
    public JpaPagingItemReader<SearchLogEntity> searchWordCountStatisticsItemReader() {
        // ! Native Query 이용
        String nativeQuery = "SELECT search_word, count(*) as count \n" +
                "FROM board.search_log sl \n" +
                "GROUP BY search_word \n" +
                "ORDER BY count DESC \n" +
                "LIMIT 10";

        JpaNativeQueryProvider<SearchLogEntity> nativeQueryProvider = new JpaNativeQueryProvider<>();
        nativeQueryProvider.setSqlQuery(nativeQuery);
        nativeQueryProvider.setEntityClass(SearchLogEntity.class);

        return new JpaPagingItemReaderBuilder<SearchLogEntity>()
                .name("searchWordCountStatisticsItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(pageSize)
                .queryProvider(nativeQueryProvider)
                .build();
    }

    // * 인기검색어 TOP 10 - ItemWriter
    @Bean
    public JpaItemWriter<HourlySearchWordCountStatisticsEntity> searchWordCountStatisticsItemWriter() {
        // TODO : 조회된 데이터는 search_word와 count 밖에 없음(sequence, create_date는 자동 생성이긴함)
        // 그래도 그냥 데이터가 들어가지는 지 확인 필요
        JpaItemWriter<HourlySearchWordCountStatisticsEntity> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(entityManagerFactory);
        return jpaItemWriter;
    }
}

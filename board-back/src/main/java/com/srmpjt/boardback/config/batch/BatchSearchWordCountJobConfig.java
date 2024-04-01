package com.srmpjt.boardback.config.batch;

import com.srmpjt.boardback.batch.UniqueRunIdIncrementer;
import com.srmpjt.boardback.entity.board.SearchLogEntity;
import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.database.orm.JpaNativeQueryProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

/*
* 인기검색어 TOP 10
* */

@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchSearchWordCountJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    @Qualifier("statisticsEntityManagerFactory")
    private final EntityManagerFactory outputEntityManagerFactory;

    // * 한 번에 처리할 Item 개수
    private int pageSize = 10;

    // * Job
    @Bean
    public Job searchWordCountStatisticsJob() {
        return jobBuilderFactory.get("searchWordCountStatisticsJob")
                .start(searchWordCountStatisticsStep())
                .incrementer(new UniqueRunIdIncrementer())
                .preventRestart() // # Job 실패 시, 재시작 막기
                .build();
    }

    // * Step
    @Bean
    public Step searchWordCountStatisticsStep() {
        return stepBuilderFactory.get("searchWordCountStatisticsStep")
                .<SearchLogEntity, HourlySearchWordCountStatisticsEntity> chunk(pageSize)
                .reader(searchWordCountStatisticsItemReader())
//                .processor()
                .writer(searchWordCountStatisticsItemWriter())
                .build();
    }

    // * ItemReader
    @Bean
    public JpaPagingItemReader<SearchLogEntity> searchWordCountStatisticsItemReader() {
        // ! Native Query 이용
        String nativeQuery = "SELECT search_word, count(*) as count " +
                "FROM search_log " +
                "GROUP BY search_word " +
                "ORDER BY count DESC ";

        String hql = "SELECT sl.search_word, count(sl.search_word) as search_count " +
                "FROM Search_log sl " +
                "GROUP BY search_word " +
                "ORDER BY search_count DESC";

//        JpaNativeQueryProvider<SearchLogEntity> nativeQueryProvider = new JpaNativeQueryProvider<>();
//        nativeQueryProvider.setSqlQuery(nativeQuery);
//        nativeQueryProvider.setEntityClass(SearchLogEntity.class);

        return new JpaPagingItemReaderBuilder<SearchLogEntity>()
                .name("searchWordCountStatisticsItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(pageSize)
//                .queryProvider(nativeQueryProvider)
                .queryString(hql)
                .maxItemCount(10)
                .build();
    }

    // * ItemWriter
    @Bean
    public JpaItemWriter<HourlySearchWordCountStatisticsEntity> searchWordCountStatisticsItemWriter() {
        // TODO : 조회된 데이터는 search_word와 count 밖에 없음(sequence, create_date는 자동 생성이긴함)
        // 그래도 그냥 데이터가 들어가지는 지 확인 필요
        JpaItemWriter<HourlySearchWordCountStatisticsEntity> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(outputEntityManagerFactory);
        return jpaItemWriter;
    }
}

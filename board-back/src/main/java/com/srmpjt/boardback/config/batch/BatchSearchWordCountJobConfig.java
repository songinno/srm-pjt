package com.srmpjt.boardback.config.batch;

import com.srmpjt.boardback.batch.UniqueRunIdIncrementer;
import com.srmpjt.boardback.entity.board.SearchLogEntity;
import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import com.srmpjt.boardback.util.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.step.tasklet.TaskletStep;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

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
        TaskletStep step = stepBuilderFactory.get("searchWordCountStatisticsStep")
                .<SearchLogEntity, HourlySearchWordCountStatisticsEntity>chunk(pageSize)
                .reader(searchWordCountStatisticsItemReader())
                .processor(searchWordCountStatisticsItemProcessor())
                .writer(searchWordCountStatisticsItemWriter())
                .build();
        step.setTransactionManager(CustomBeanUtils.getTransactionManagerBean("statisticsTransactionManager"));
        return step;
    }

    // * ItemReader
    @Bean
    public JpaPagingItemReader<SearchLogEntity> searchWordCountStatisticsItemReader() {

        String hql = "select sl.searchWord, count(*) as search_count from search_log sl group by sl.searchWord order by search_count desc";


        return new JpaPagingItemReaderBuilder<SearchLogEntity>()
                .name("searchWordCountStatisticsItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(pageSize)
                .queryString(hql)
                .maxItemCount(10) // # LIMIT 10
                .build();
    }

    // * ItemProcessor
    @Bean
    public ItemProcessor searchWordCountStatisticsItemProcessor() {
        return items -> { // # [VARCHAR(String), BIGINT(Long)]
            Object[] arrayOfObjects = (Object[]) items;
            String searchWord = (String) arrayOfObjects[0];
            int searchCount = Integer.parseInt(String.valueOf(arrayOfObjects[1]));

            return new HourlySearchWordCountStatisticsEntity(searchWord,searchCount);
        };
    }

    // * ItemWriter
    @Bean
    public JpaItemWriter<HourlySearchWordCountStatisticsEntity> searchWordCountStatisticsItemWriter() {
        JpaItemWriter<HourlySearchWordCountStatisticsEntity> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(outputEntityManagerFactory);
        return jpaItemWriter;
    }
}

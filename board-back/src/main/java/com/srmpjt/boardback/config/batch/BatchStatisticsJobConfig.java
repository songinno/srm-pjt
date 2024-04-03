package com.srmpjt.boardback.config.batch;

import com.srmpjt.boardback.batch.UniqueRunIdIncrementer;
import com.srmpjt.boardback.entity.board.BoardEntity;
import com.srmpjt.boardback.entity.board.SearchLogEntity;
import com.srmpjt.boardback.entity.statistics.HourlyBoardViewCountStatisticsEntity;
import com.srmpjt.boardback.entity.statistics.HourlySearchWordCountStatisticsEntity;
import com.srmpjt.boardback.util.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.job.builder.FlowBuilder;
import org.springframework.batch.core.job.flow.Flow;
import org.springframework.batch.core.job.flow.support.SimpleFlow;
import org.springframework.batch.core.step.tasklet.TaskletStep;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;

import javax.persistence.EntityManagerFactory;

/*
* 인기검색어 TOP 10
* */

@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchStatisticsJobConfig {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private final JobBuilderFactory jobBuilderFactory;
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    @Qualifier("statisticsEntityManagerFactory")
    private final EntityManagerFactory outputEntityManagerFactory;

    // ! Job 이름
    public static final String BATCH_JOB_NAME = "batchStatisticsJob";

    // * 한 번에 처리할 Item 개수
    private int pageSize = 10;

    // * Job
    @Bean
    public Job batchStatisticsJob() {
        return jobBuilderFactory.get(BATCH_JOB_NAME)
                .start(splitFlow())
                .build()
                .incrementer(new UniqueRunIdIncrementer())
                .preventRestart() // # Job 실패 시, 재시작 막기
                .build();
    }

    // * Flow를 이용한 Step 병렬 처리
    // ! TaskExecutor(Asynchronous)
    @Bean
    public TaskExecutor taskExecutor() {
        return new SimpleAsyncTaskExecutor("statisticsThread");
    }

    @Bean
    public Flow splitFlow() {
        return new FlowBuilder<SimpleFlow>("splitFlow")
                .split(taskExecutor())
                .add(flow1(), flow2())
                .build();
    }


    @Bean
    public Flow flow1() {
        return new FlowBuilder<SimpleFlow>("flow1")
                .start(searchWordCountStatisticsStep())
                .build();
    }

    @Bean
    public Flow flow2() {
        return new FlowBuilder<SimpleFlow>("flow2")
                .start(boardViewCountStatisticsStep())
                .build();
    }

    // * Step
    // ! 인기 검색어 TOP 10
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

    // ! 인기 게시글 TOP 10
    @Bean
    public Step boardViewCountStatisticsStep() {
        TaskletStep step = stepBuilderFactory.get("boardViewCountStatisticsStep")
                .<BoardEntity, HourlyBoardViewCountStatisticsEntity>chunk(pageSize)
                .reader(boardViewCountStatisticsItemReader())
                .processor(boardViewCountStatisticsItemProcessor())
                .writer(boardViewCountStatisticsItemWriter())
                .build();
        step.setTransactionManager(CustomBeanUtils.getTransactionManagerBean("statisticsTransactionManager"));
        return step;
    }

    // * ItemReader
    // ! 인기 검색어 TOP 10
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

    // ! 인기 게시글 TOP 10
    @Bean
    public JpaPagingItemReader<BoardEntity> boardViewCountStatisticsItemReader() {
        String hql = "select b.boardNumber, b.viewCount from board b order by b.viewCount desc";

        return new JpaPagingItemReaderBuilder<BoardEntity>()
                .name("boardViewCountStatisticsItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(pageSize)
                .queryString(hql)
                .maxItemCount(10)
                .build();
    }

    // * ItemProcessor
    // ! 인기 검색어 TOP 10
    @Bean
    public ItemProcessor searchWordCountStatisticsItemProcessor() {
        return items -> { // # [VARCHAR(String), BIGINT(Long)]
            Object[] arrayOfObjects = (Object[]) items;
            String searchWord = (String) arrayOfObjects[0];
            int searchCount = Integer.parseInt(String.valueOf(arrayOfObjects[1]));

            return new HourlySearchWordCountStatisticsEntity(searchWord,searchCount);
        };
    }

    // ! 인기 게시글 TOP 10
    @Bean
    public ItemProcessor boardViewCountStatisticsItemProcessor() {
        return items -> { // # [ Long, Long ]
            Object[] arrayOfObjects = (Object[]) items;
            int boardNumber = Integer.parseInt(String.valueOf(arrayOfObjects[0]));
            int viewCount = Integer.parseInt(String.valueOf(arrayOfObjects[1]));

            return new HourlyBoardViewCountStatisticsEntity(boardNumber, viewCount);
        };
    }

    // * ItemWriter
    // ! 인기 검색어 TOP 10
    @Bean
    public JpaItemWriter<HourlySearchWordCountStatisticsEntity> searchWordCountStatisticsItemWriter() {
        JpaItemWriter<HourlySearchWordCountStatisticsEntity> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(outputEntityManagerFactory);
        return jpaItemWriter;
    }

    // ! 인기 게시글 TOP 10
    @Bean
    public JpaItemWriter<HourlyBoardViewCountStatisticsEntity> boardViewCountStatisticsItemWriter() {
        JpaItemWriter<HourlyBoardViewCountStatisticsEntity> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(outputEntityManagerFactory);
        return jpaItemWriter;
    }
}

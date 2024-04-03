package com.srmpjt.boardback.quartz;

import com.srmpjt.boardback.util.CustomBeanUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.explore.JobExplorer;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@PersistJobDataAfterExecution // # Job 동작 중 JobDataMap을 변경할 경우 사용
@DisallowConcurrentExecution // # Job 동작 중, Job이 병렬적으로 또 실행되는 것을 막아줌
public class QuartzStatisticsJob extends QuartzJobBean {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private JobLauncher jobLauncher;
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private JobExplorer jobExplorer; // # 메타 테이블에 대한 read only 쿼리 기능을 위한 인터페이스 -> run.id에 대한 메타테이블 접근 가능해짐

    @SneakyThrows
    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        log.debug("Quartz - Execute Internal Job");

        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();

        Job batchJob = CustomBeanUtils.getBatchJobBean(jobDataMap.getString("batchJobName"));

        // ! Batch Job 실행
        jobLauncher.run(
                batchJob,
                new JobParametersBuilder(jobExplorer)
                        .getNextJobParameters(batchJob)
                        .toJobParameters()
        );
    }
}

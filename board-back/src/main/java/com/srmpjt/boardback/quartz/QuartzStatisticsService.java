package com.srmpjt.boardback.quartz;

import org.quartz.*;

import java.util.Map;

public interface QuartzStatisticsService {
    // * Init
    boolean init();

    // * 스케줄러에 스케줄 등록
    void register(
        Class<? extends Job> job,
        String name,
        String description,
        Map params,
        String cronExp
    ) throws SchedulerException;

    // * JobDetail 생성
    <T extends Job>JobDetail createJobDetail(
        Class<? extends Job> job,
        String name,
        String description,
        Map params
    ) throws SchedulerException;

    // * CronTrigger 생성
    Trigger createCronTrigger(String cronExp) throws SchedulerException;

    // * 스케줄러 시작
    void start() throws SchedulerException;

    // * 스케줄러 종료
    void shutdown() throws SchedulerException, InterruptedException;

    // * 스케줄러 재시작
    void restart() throws SchedulerException;

    // * 스케줄러 클리어
    void clear() throws SchedulerException;

    // * Job, Trigger 리스너 등록
    void addListener(JobListener jobListener, TriggerListener triggerListener) throws SchedulerException;
}

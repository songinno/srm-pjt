package com.srmpjt.boardback.quartz;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuartzStatisticsServiceImpl implements QuartzStatisticsService{
    private final Scheduler scheduler;
    public static final String QUARTZ_JOB_NAME = "QuartzStatisticsJob";
//    private static final String CRON_EXP = "0 0 0/1 * * ?"; // 매 정각마다
    private static final String CRON_EXP = "0/10 * * * * ?"; // 10초마다

    @Override
    @PostConstruct
    public boolean init() {
        log.debug("Quartz - Scheduler Initializing [START]");
        try {
            // ! 1. clear;
            this.clear();

            // ! 2. Listener
            this.addListener(new QuartzStatisticsScheduleJobListener(), new QuartzStatisticsScheduleTriggerListener());

            // ! 3. Parameters
            Map params = new HashMap();
            params.put("executeCount", 1);
            params.put("date", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            params.put("batchJobName", "batchStatisticsJob"); // # Batch Job Config에서 설정한 Batch Job의 Bean 이름과 동일하게 설정

            // ! 4. 스케줄 등록
            String description = "Quartz Statistics Schedule with Batch";
            this.register(
                    QuartzStatisticsJob.class,
                    QUARTZ_JOB_NAME,
                    description,
                    params,
                    CRON_EXP
            );
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Quartz - Scheduler Initializing [FAILED]");
        }
        log.debug("Quartz - Scheduler Initializing [SUCCESS]");
        return true;
    }

    @Override
    public void register(Class<? extends Job> job, String name, String description, Map params, String cronExp) throws SchedulerException {
        // ! JobDetail + Trigger 생성
        JobDetail jobDetail = createJobDetail(job, name, description, params);
        Trigger cronTrigger = createCronTrigger(cronExp);

        // ! 스케줄러에 등록
        scheduler.scheduleJob(jobDetail, cronTrigger);
    }

    @Override
    public <T extends Job> JobDetail createJobDetail(Class<? extends Job> job, String name, String description, Map params) throws SchedulerException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.putAll(params);

        return JobBuilder
                .newJob(job)
                .withIdentity(name)
                .withDescription(description)
                .usingJobData(jobDataMap)
                .build();
    }

    @Override
    public Trigger createCronTrigger(String cronExp) throws SchedulerException {
        return TriggerBuilder
                .newTrigger()
                .withSchedule(CronScheduleBuilder.cronSchedule(cronExp))
                .build();
    }

    @Override
    public void start() throws SchedulerException {
        if (scheduler != null && !scheduler.isStarted()) {
            scheduler.start();
        }
    }

    @Override
    public void shutdown() throws SchedulerException, InterruptedException {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
        }
    }

    // TODO : restart() : 선언만 해둠 (따로 사용할 상황은 없음)
    @Override
    public void restart() throws SchedulerException {
        scheduler.standby(); // # standby() 이후 start() -> misfire 된 트리거들을 모두 무시
        this.init();
        this.start();
    }

    @Override
    public void clear() throws SchedulerException {
        scheduler.clear();
    }

    @Override
    public void addListener(JobListener jobListener, TriggerListener triggerListener) throws SchedulerException {
        ListenerManager listenerManager = scheduler.getListenerManager();
        listenerManager.addJobListener(jobListener);
        listenerManager.addTriggerListener(triggerListener);
    }
}

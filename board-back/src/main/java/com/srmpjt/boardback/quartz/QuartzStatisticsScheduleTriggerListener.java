package com.srmpjt.boardback.quartz;

import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.Trigger;
import org.quartz.TriggerListener;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
public class QuartzStatisticsScheduleTriggerListener implements TriggerListener {
    @Override
    public String getName() {
        return this.getClass().getName();
    }

    @Override
    public void triggerFired(Trigger trigger, JobExecutionContext context) {
        log.debug("Qaurtz - Trigger 실행");
    }

    // * true를 return하면 Job을 중단시키는 메서드
    @Override
    public boolean vetoJobExecution(Trigger trigger, JobExecutionContext context) {
        log.debug("Quartz - Trigger 상태 체크");
        return false;
    }

    @Override
    public void triggerMisfired(Trigger trigger) {
        log.debug("Quartz - Trigger Misfired");
    }

    @Override
    public void triggerComplete(Trigger trigger, JobExecutionContext context, Trigger.CompletedExecutionInstruction triggerInstructionCode) {
        log.debug("Quartz - Trigger 완료");
        log.debug("----- Reset Parameters -----");
        // ! JobDataMap 재설정
        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();
        int count = (int) jobDataMap.get("executeCount");
        jobDataMap.put("executeCount", ++count);
        jobDataMap.put("date", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    }
}

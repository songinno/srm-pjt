package com.srmpjt.boardback.quartz;

import org.springframework.beans.factory.annotation.Autowired;

public class QuartzStarter {

    @Autowired
    private QuartzStatisticsService quartzStatisticsService;

    public void init() throws Exception {
        boolean initResult = quartzStatisticsService.init();
        if (initResult) quartzStatisticsService.start();
    }

    public void destroy() throws Exception {
        quartzStatisticsService.shutdown();
    }

    public void restart() throws Exception {
        quartzStatisticsService.restart();
    }
}

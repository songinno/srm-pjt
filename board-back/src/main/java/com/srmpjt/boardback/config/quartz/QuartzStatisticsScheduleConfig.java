package com.srmpjt.boardback.config.quartz;

import com.srmpjt.boardback.quartz.AutowiringSpringBeanJobFactory;
import com.srmpjt.boardback.quartz.QuartzStarter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class QuartzStatisticsScheduleConfig {
    // TODO : Quartz 전용 Datasource와 TransactionManager를 따로 설정하지 않아도 되긴 됨
    // quartz.properties가 먹히는건가 확인 필요
    private final DataSource dataSource;
    private final ApplicationContext applicationContext;
    private final PlatformTransactionManager transactionManager;

    @Bean
    public SchedulerFactoryBean schedulerFactoryBean() {
        SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();

        AutowiringSpringBeanJobFactory autowiringSpringBeanJobFactory = new AutowiringSpringBeanJobFactory();
        autowiringSpringBeanJobFactory.setApplicationContext(applicationContext);

        schedulerFactoryBean.setJobFactory(autowiringSpringBeanJobFactory);
        schedulerFactoryBean.setDataSource(dataSource);
        schedulerFactoryBean.setOverwriteExistingJobs(true);
        schedulerFactoryBean.setTransactionManager(transactionManager);
        schedulerFactoryBean.setQuartzProperties(quartzProperties());
        return schedulerFactoryBean;
    }

    private Properties quartzProperties() {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        propertiesFactoryBean.setLocation(new ClassPathResource("quartz.properties"));
        Properties properties = null;
        try {
            propertiesFactoryBean.afterPropertiesSet();
            properties = propertiesFactoryBean.getObject();
        } catch (IOException e) {
            e.printStackTrace();
            log.error("quartzProperties parse error : {}", e);
        }
        return properties;
    }

    @Bean(initMethod = "init", destroyMethod = "destroy")
    public QuartzStarter quartzStarter() {
        return new QuartzStarter();
    }
}

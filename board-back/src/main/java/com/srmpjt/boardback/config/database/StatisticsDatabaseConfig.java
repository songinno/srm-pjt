package com.srmpjt.boardback.config.database;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = { "com.srmpjt.boardback.repository.statistics" },
        entityManagerFactoryRef = "statisticsEntityManagerFactory",
        transactionManagerRef = "statisticsTransactionManager"
)
public class StatisticsDatabaseConfig {
    // * DataSource
    @Bean
    @ConfigurationProperties("spring.datasource.statistics")
    DataSource statisticsDataSource() {
        DataSourceBuilder builder = DataSourceBuilder.create();
        builder.type(HikariDataSource.class);

        return builder.build();
    }

    // * EntityManager
    @Bean
    public LocalContainerEntityManagerFactoryBean statisticsEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("statisticsDataSource") DataSource dataSource
    ) {
        // ! JPA Properties
        Map<String, String> properties = new HashMap<>();
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");
        properties.put("hibernate.hbm2ddl.auto", "update");

        return builder
                .dataSource(dataSource)
                .packages("com.srmpjt.boardback.entity.statistics")
                .properties(properties)
                .build();
    }


    // * Transaction Setting
    @Bean
    public PlatformTransactionManager statisticsTransactionManager(@Qualifier("statisticsEntityManagerFactory")EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager((entityManagerFactory));
    }
}

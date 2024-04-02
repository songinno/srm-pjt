package com.srmpjt.boardback.config.database;

import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy;
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
        properties.put("hibernate.physical_naming_strategy", CamelCaseToUnderscoresNamingStrategy.class.getName());
        properties.put("hibernate.implicit_naming_strategy", SpringImplicitNamingStrategy.class.getName());

        return builder
                .dataSource(dataSource)
                .persistenceUnit("statisticsEm")
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

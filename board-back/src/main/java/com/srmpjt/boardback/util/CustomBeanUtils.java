package com.srmpjt.boardback.util;

import com.srmpjt.boardback.provider.ApplicationContextProvider;
import lombok.experimental.UtilityClass;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.PlatformTransactionManager;

@UtilityClass
public class CustomBeanUtils {
    public static <T> T getBean(String beanName, Class<T> classType) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(beanName, classType);
    }

    public static PlatformTransactionManager getTransactionManagerBean(String beanName) {
        return getBean(beanName, PlatformTransactionManager.class);
    }
}

package cn.Bohai.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import cn.Bohai.config.Interceptors.TCMPLoginInterceptor;

@Configuration
public class MyWebAppConfigurer extends WebMvcConfigurerAdapter {

	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
	    // 多个拦截器组成一个拦截器链
	    registry.addInterceptor(new TCMPLoginInterceptor())
	    .addPathPatterns("/workflow/**")
	    .addPathPatterns("/project/**")
	    .addPathPatterns("/user/getUserInfo")
	    .addPathPatterns("/message/**")
	    .excludePathPatterns("/");
	    super.addInterceptors(registry);
	}
}
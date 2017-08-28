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
	    .addPathPatterns("/")
//	    .addPathPatterns("/workflow/getDoneMessage")
//	    .addPathPatterns("/workflow/getAwaitDetail")
//	    .addPathPatterns("/workflow/getProcessInformation")
//	    .addPathPatterns("/workflow/selectPerson")
//	    .addPathPatterns("/workflow/getNextNode")
//	    .addPathPatterns("/workflow/getHistoricalApproval")
//	    .addPathPatterns("/workflow/getMyInitiatedProcess")
//	    .addPathPatterns("/workflow/getCommonlanguage")
//	    .addPathPatterns("/workflow/getSplitRead")
//	    .addPathPatterns("/project/**")
//	    .addPathPatterns("/user/getUserInfo")
//	    .addPathPatterns("/message/**")
	    .excludePathPatterns("/");
	    super.addInterceptors(registry);
	}
}
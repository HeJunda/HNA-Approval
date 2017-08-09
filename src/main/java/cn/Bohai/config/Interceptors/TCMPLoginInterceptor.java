package cn.Bohai.config.Interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import cn.Bohai.service.UserService;


/**
 * 自定义拦截器,校验TCMP登录
 *
 * @author    Junda
 * @create    2017/6/12
 */
public class TCMPLoginInterceptor implements HandlerInterceptor {
	
	@Autowired
	private UserService userservice = new UserService();


	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		
		//ＴＣＭＰ登录校验
		Boolean isLogin = userservice.testBohaiLogin();
		
		return isLogin;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}

package cn.Bohai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;



/**
 * Created by Junda on 2017/6/14.
 */
@RestController
public class IndexContorller {
	
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/index")
	public ModelAndView  inIndex(){
		 return new ModelAndView("index");
	}
	
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/agency")
	public ModelAndView  agency(){
		 return new ModelAndView("agency");
	}

	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/follow")
	public ModelAndView  follow(){
		 return new ModelAndView("follow");
	}

	
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/examine")
	public ModelAndView  examine(){
		 return new ModelAndView("examine");
	}

	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/message")
	public ModelAndView  message(){
		 return new ModelAndView("message");
	}
	
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/project-detail")
	public ModelAndView  projectDetail(){
		 return new ModelAndView("project-detail");
	}
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/project")
	public ModelAndView  project(){
		 return new ModelAndView("test");
	}
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/process-detail")
	public ModelAndView  processDetail(){
		 return new ModelAndView("process-detail");
	}
	/**
     * 用户登录校验
     * @throws Exception 
     */
	@RequestMapping(value="/search")
	public  ModelAndView  search(){
		 return new ModelAndView("search");
	}




}

package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class ProjectDetail implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 项目编号
     */
    private String projectcode;
    /**
     * 用户ID
     */
    private String userid;

	public String getProjectcode() {
		return projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
    
    
	
    
     
}

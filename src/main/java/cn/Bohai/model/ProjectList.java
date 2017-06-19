package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class ProjectList implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 项目名称
     */
    private String projectname;
    /**
     * 项目阶段
     */
    private String projectphase;
    /**
     * 部门code
     */
    private String depcode;
    /**
     * 起始页
     */
    private int start;
    /**
     * 每页条数
     */
    private int limit;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getProjectname() {
		return projectname;
	}
	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}
	public String getProjectphase() {
		return projectphase;
	}
	public void setProjectphase(String projectphase) {
		this.projectphase = projectphase;
	}
	public String getDepcode() {
		return depcode;
	}
	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	
    
     
}

package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/5/13.
 */
public class ProcessInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 流程实例ID
     */
    private String instanceid;
    /**
     * 用户ID
     */
    private String userid;

	public String getInstanceid() {
		return instanceid;
	}

	public void setInstanceid(String instanceid) {
		this.instanceid = instanceid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
	

    
}

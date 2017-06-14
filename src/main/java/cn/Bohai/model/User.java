package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 用户密码
     */
    private String userpwd;
    /**
     * 客户端类型
     */
    private String clienttype;
    /**
     * 客户端识别码
     */
    private String clientsign;
    /**
     * 安全码
     */
    private String checkcode;
    /**
     * 登录模式
     */
    private String loginmode;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUserpwd() {
		return userpwd;
	}
	public void setUserpwd(String userpwd) {
		this.userpwd = userpwd;
	}
	public String getClienttype() {
		return clienttype;
	}
	public void setClienttype(String clienttype) {
		this.clienttype = clienttype;
	}
	public String getClientsign() {
		return clientsign;
	}
	public void setClientsign(String clientsign) {
		this.clientsign = clientsign;
	}
	public String getCheckcode() {
		return checkcode;
	}
	public void setCheckcode(String checkcode) {
		this.checkcode = checkcode;
	}
	public String getLoginmode() {
		return loginmode;
	}
	public void setLoginmode(String loginmode) {
		this.loginmode = loginmode;
	}
    
    
}

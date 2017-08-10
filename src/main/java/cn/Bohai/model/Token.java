package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/5/13.
 */
public class Token implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

    
     
}


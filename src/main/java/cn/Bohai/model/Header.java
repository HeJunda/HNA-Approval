package cn.Bohai.model;

public class Header {
	private int respCode;
	private String respMsg;
	private String version;
	public int getRespCode() {
		return respCode;
	}
	public void setRespCode(int respCode) {
		this.respCode = respCode;
	}
	public String getRespMsg() {
		return respMsg;
	}
	public void setRespMsg(String respMsg) {
		this.respMsg = respMsg;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
}	

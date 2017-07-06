package cn.Bohai.Utils;

import cn.Bohai.Utils.RSAUtils;
import cn.Bohai.model.CheckUserAuthEntity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class SSOUtil {
	 /**  
     * 向指定URL发送POST方法的请求  
     *   
     * @param url  
     *            发送请求的URL  
     * @param param  
     *            请求参数，请求参数应该是name1=value1&name2=value2的形式。  
     * @return URL所代表远程资源的响应  
     */  
    public static String sendPost(String url, String param) {  
        PrintWriter out = null;  
        BufferedReader in = null;  
        String result = "";  
        
        try {  
            URL realUrl = new URL(url);  
            // 打开和URL之间的连接  
            URLConnection conn = realUrl.openConnection();  
            // 设置通用的请求属性  
            conn.setRequestProperty("accept", "*/*");  
            conn.setRequestProperty("connection", "Keep-Alive");  
            conn.setRequestProperty("user-agent",  
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
            
            // 发送POST请求必须设置如下两行  
            conn.setDoOutput(true);  
            conn.setDoInput(true);  
            // 获取URLConnection对象对应的输出流  
            out = new PrintWriter(conn.getOutputStream());  
            // 发送请求参数  
            out.print(param);  
            // flush输出流的缓冲  
            out.flush();  
            // 定义BufferedReader输入流来读取URL的响应  
            in = new BufferedReader(new InputStreamReader(
            		conn.getInputStream(), "UTF-8"));
            String line;  
            while ((line = in.readLine()) != null) {  
                result += line;  
            }  
            System.out.println(result);
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            try {  
                if (out != null) {  
                    out.close();  
                }  
                if (in != null) {  
                    in.close();  
                }  
            } catch (IOException ex) {  
                ex.printStackTrace();  
            }  
        }  
        return result;  
    }
    
    /**
     * sso token 验证
     * @param token
     * @return
     */
    public static String CheckTokenBySSO(String token) {
    	String retValue = "";
    	//第三方应用的appid
        String appId = "C75E89BB45354E23BA4A4E1B696271EE";
        //sso服务器地址
        String ssoUrl = "http://10.70.70.248:8080/ssoserver/service/gateway.do";
        
        String body = "{\"token\":\""+token+"\"}";

		//sso服务公钥
		String publicKeyStr = RSAUtils.loadKeyStringByPath("rsa_public_key.pem");
		String bodyEncrypt;
		try {
			//加密body参数
			bodyEncrypt = RSAUtils.encryptByPublicKey(body, publicKeyStr, "utf-8");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "";
		}
		
		//请求接口参数
        String content = "{";
        content += "\"header\":{\"version\":\"1.0\",\"appId\":\""+appId+"\"}";
        try {
			content += ",\"body\":\""+URLEncoder.encode(bodyEncrypt,"utf-8")+"\"}";
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        content += "}";
        
        //组装全部请求参数
        String parameters = "serviceName=UserSSOService&methodName=checkUserAuth&params="+content;

        System.out.print(parameters);
        
        //调用接口
        retValue = sendPost(ssoUrl, parameters);
        
        System.out.println(retValue);

        //获取返回值
		Gson gson = new GsonBuilder().serializeNulls().disableHtmlEscaping().create();
		CheckUserAuthEntity checkUserAuthEntity = gson.fromJson(retValue, CheckUserAuthEntity.class);
		
		//打印返回代码和返回信息
        System.out.println("respCode:"+checkUserAuthEntity.getHeader().getRespCode()+",respMsg:"+checkUserAuthEntity.getHeader().getRespMsg());
        
		//解密body内容
		String privateKeyStr = RSAUtils.loadKeyStringByPath("private_key.pem");
		try {
			String bodyDecrypt = RSAUtils.decryptByPrivateKey(checkUserAuthEntity.getBody(), privateKeyStr, "utf-8");
	        System.out.println("bodyDecrypt:"+bodyDecrypt);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        return retValue;
        
    }

//    public static void main(String[] args) throws UnsupportedEncodingException {
//    	String token = "123";
//    	CheckTokenBySSO(token);
//	}
}
package cn.Bohai.Utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import cn.Bohai.model.CheckUserAuthEntity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class MPUtil {
	
//	 String publicKey = Utils.RSACrypto.GetPublicKey(ConfigKeyConst.PushPublicKeyFile);
//     String timestamp = DateTime.Now.ToString();
//
//     //soapHeader
//     PushContentService.ServiceSoapHeader soapHeader = new PushContentService.ServiceSoapHeader();
//     soapHeader.Account = ConfigKeyConst.PushAccount;
//     soapHeader.TimeKey = new Utils.RSACrypto().RSAEncrypt(publicKey, timestamp);
//     soapHeader.Password = new Utils.RSACrypto().RSAEncrypt(publicKey, ConfigKeyConst.PushPassword);
//
//     PushContentService.PushService service = new PushContentService.PushService();
//     service.ServiceSoapHeaderValue = soapHeader;
//     
     
     
     
     
     
     
     /**
      * 消息推送
      * @param token
      * @return
      */
     public static String CheckTokenBySSO(String token) {
     	 String retValue = "";
     	 //第三方应用的appid
         String appId = "BB7B1FB2E8214EF39031506033307CA3";
         //sso服务器地址
         String ssoUrl = "http://10.70.70.248:8080/ssoserver/service/gateway.do";
         
         String body = "{\"token\":\""+token+"\"}";

 		//sso服务公钥
 		String publicKeyStr = RSAUtils.loadKeyStringByPath("D:/rsa_public_key.pem");
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
//         retValue = sendPost(ssoUrl, parameters);
         
         System.out.println(retValue);

         //获取返回值
 		Gson gson = new GsonBuilder().serializeNulls().disableHtmlEscaping().create();
 		CheckUserAuthEntity checkUserAuthEntity = gson.fromJson(retValue, CheckUserAuthEntity.class);
 		
 		//打印返回代码和返回信息
         System.out.println("respCode:"+checkUserAuthEntity.getHeader().getRespCode()+",respMsg:"+checkUserAuthEntity.getHeader().getRespMsg());
         
 		//解密body内容
 		String privateKeyStr = RSAUtils.loadKeyStringByPath("D:/private_key.pem");
 		try {
 			String bodyDecrypt = RSAUtils.decryptByPrivateKey(checkUserAuthEntity.getBody(), privateKeyStr, "utf-8");
 	        System.out.println("bodyDecrypt:"+bodyDecrypt);
 		} catch (Exception e) {
 			// TODO Auto-generated catch block
 			e.printStackTrace();
 		}
 		
         return retValue;
         
     }
     

}

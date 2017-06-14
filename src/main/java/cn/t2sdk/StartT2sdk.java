package cn.t2sdk;

import com.hundsun.t2sdk.impl.client.T2Services;
import com.hundsun.t2sdk.interfaces.IClient;
import com.hundsun.t2sdk.interfaces.T2SDKException;

public class StartT2sdk {

	public static void main(String[] args) {
		IClient client = null;   

		// ��ȡT2Servicesʵ��
		T2Services sdkServices = T2Services.getInstance();

		// ��ʼ��sdk
		try {
			sdkServices.init();
			sdkServices.start();
			// ��ȡ��Ϊ jres �Ŀͻ���
			client = sdkServices.getClient("tcmpdoudou");
		} catch (T2SDKException e) {
			e.printStackTrace();
		}
		
	}
}

package cn.t2sdk;

import com.hundsun.t2sdk.common.core.event.EventFactory;
import com.hundsun.t2sdk.common.share.dataset.DatasetService;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.impl.client.T2Services;
import com.hundsun.t2sdk.interfaces.IClient;
import com.hundsun.t2sdk.interfaces.T2SDKException;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;
import com.hundsun.t2sdk.interfaces.share.event.EventReturnCode;
import com.hundsun.t2sdk.interfaces.share.event.EventType;
import com.hundsun.t2sdk.interfaces.share.event.IEvent;

public class MobileTransfer {

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
		
		{
				// �����������
				MapWriter mw = new MapWriter();
				mw.put("login_account","admin");
				mw.put("password","1");
				mw.put("interfaceid","R8001");//������ӿ�
				mw.put("clientsign","meadidea.com");
				mw.put("checkcode","fake_check_code");
				mw.put("clienttype","iphone");
				mw.put("userpwd","asdfasd");
				mw.put("userid","admin");
				mw.put("instanceid","projectSetupApproval.1320063");
				
//				mw.put("flowtype","batch_cap_capitalTransBatch");
				
//				mw.put("accoId","12472");
//				mw.put("instanceid","WF13090420111250");
//				mw.put("userid","admin");
//				mw.put("accountnumber","1320000000000000000000000000");
//				mw.put("bankNo","A10001");
//				mw.put("bankName","�й���������");
//				mw.put("nameInBank","�����������޹�˾");
//				mw.put("bankacco","2601014040000230");
//				mw.put("jrxxkzbh","yimi");
//				mw.put("keepBankName","�й���������");
//				mw.put("guaranteebankcode","yimi");
//				mw.put("guaranteebankno","yimi");
//				mw.put("provinceCode","31");
//				mw.put("cityNo","3101");
//				
//				mw.put("userid","admin");
//				mw.put("delegateman","admin");
//				mw.put("agentman","10001");
//				mw.put("delegatetype","A");
//				mw.put("starttime","20150409140435");
//				mw.put("endtime","20150414140435");
//				mw.put("delegatestate","1");
//				mw.put("isRecovery","1");
//				mw.put("isdoAsDelegator","Y");
//				mw.put("remark","�ֹ�����");
//				
//				mw.put("taskid","30215");
//				mw.put("actionvalue","");
//				mw.put("actionname","����");
//				mw.put("remark","����");
//				mw.put("actiontype","1");
				

				// ���ʻ������̣����ܺ�9300  8000�ƶ���
				IEvent event = new EventFactory().getEventByAlias("8000", EventType.ET_REQUEST);
//				IEvent event = new EventFactory().getEventByAlias("520601", EventType.ET_REQUEST);
				event.putEventData(mw.getDataset());
				
				// ͬ��������ô�ָ����ʱ
				try {
					IEvent result = client.sendReceive(event);
					System.out.println("count="+result.getEventDatas().getDatasetCount());
					printEvent(result);
				} catch (T2SDKException e) {
					e.printStackTrace();
				}
			}
		
		// ֹͣT2sdk
		//sdkServices.stop();
	}

	private static void printEvent(IEvent resultEvent)
	{
		System.out.println("returnCode: " + resultEvent.getReturnCode());
		System.out.println("errorNo: " + resultEvent.getErrorNo());
		System.out.println("errorInfo: " + resultEvent.getErrorInfo());

		if (resultEvent.getReturnCode() == EventReturnCode.I_OK) {
			IDatasets result = resultEvent.getEventDatas();
			int datasetCount = result.getDatasetCount();
			System.out.println("datasetCount="+datasetCount);
			System.out.println("datasetCount="+result.getDataset(0).getTotalCount());
			
			for (int i = 0; i < datasetCount; i++) {
				System.out.println("dataset - " + result.getDatasetName(i));
				// ��ӡIDataset
				DatasetService.printDataset(result.getDataset(i));
				System.out.println();
			}
		}
	}

}

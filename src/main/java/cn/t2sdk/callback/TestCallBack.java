package cn.t2sdk.callback;

import com.hundsun.t2sdk.common.share.dataset.DatasetService;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.impl.client.ClientSocket;
import com.hundsun.t2sdk.interfaces.ICallBackMethod;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;
import com.hundsun.t2sdk.interfaces.share.event.EventReturnCode;
import com.hundsun.t2sdk.interfaces.share.event.IEvent;

public class TestCallBack  implements ICallBackMethod {
	
	public void execute(IEvent event, ClientSocket client) {
		// ��ȡ���ܺ�
		String functionId = event.getServiceAlias();
		// ��ȡ�����
//		String serviceId = event.getServiceId();
		if (functionId == null) { // ���ܺ���Ч
			event.changeToresponse(); // �������¼�ת��ΪӦ���¼��������÷����롢����źźʹ�����Ϣ��
			event.setReturnCode(EventReturnCode.I_BIZ_ERROR); // ���÷�����Ϊ ҵ�����
			event.setErrorCode("1234", "��Ч��T2sdk����"); // ��������Ϊ 1234��ҵ�����Ĵ���źʹ�����Ϣ�ɿ������Լ�����
			client.send(event); // ���ش���Ӧ��
			return ;
		}
		System.out.println("�յ���һ���������󣬹��ܺ�Ϊ---------��" + functionId);
		
		IDataset request = null;
		IDatasets dss = event.getEventDatas();
		if (dss.getDatasetCount() > 0) {
			request = dss.getDataset(0);
			// ��ӡ���յ����
			System.out.println("---------------��ݽ��տ�ʼ-----------------");
			DatasetService.printDataset(request);
			System.out.println("---------------��ݽ��ս���-----------------");
		}
		event.changeToresponse();
		
		MapWriter mw = new MapWriter();
		
		if("9000".equals(functionId)){//��Ϣ����
		}else if("9001".equals(functionId)){//������չ
		}

		System.out.println("---------------��ݷ�����ʼ-----------------");
		DatasetService.printDataset(mw.getDataset());
		System.out.println("---------------��ݷ�������-----------------");
		
		
		mw.put("status","success");
		mw.put("code","1");
		mw.put("result","");
		event.putEventData(mw.getDataset());
		
		client.send(event);
		return ;
	}
	
}

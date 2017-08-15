package cn.Bohai.Utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.commons.lang.StringUtils;

import com.hundsun.t2sdk.common.core.event.EventFactory;
import com.hundsun.t2sdk.common.share.dataset.DatasetService;
import com.hundsun.t2sdk.impl.client.T2Services;
import com.hundsun.t2sdk.interfaces.IClient;
import com.hundsun.t2sdk.interfaces.T2SDKException;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;
import com.hundsun.t2sdk.interfaces.share.event.EventReturnCode;
import com.hundsun.t2sdk.interfaces.share.event.EventType;
import com.hundsun.t2sdk.interfaces.share.event.IEvent;

public class T2Util {
	
	private static final Logger logger = Logger.getLogger(T2Util.class);
	
	//单例
	private static T2Util T2util=null; 
	private T2Util (){}  
	
	//t2客户端
	private  IClient client=null;
	
    public static void init(){
		if(T2util==null){
			
			T2util=new T2Util();


			// 获取T2Services实例
			T2Services sdkServices = T2Services.getInstance();
			IClient client=null;
			// 初始化sdk
			try {
				sdkServices.init();
				sdkServices.start();
				// 获取名为 tcmpdoudou 的客户端
				logger.info("开始启动T2sdk。。。");
				client = sdkServices.getClient("tcmpdoudou");
				T2util.setClient(client);
				logger.info("启动T2sdk成功!");
			} catch (Exception e) {
				logger.error("启动t2sdk失败："+e.getMessage(),e);
			}
		}
	}
    
    public IClient getClient(){
		return client;
	}
	
	public void setClient(IClient _client){
		client=_client;
	}

	
	
	/**
	 * 发送数据
	 * @param functionId
	 * @param senddata
	 */
	public static IDatasets send(String functionId,IDataset senddata)throws Exception{
		logger.info("调用"+functionId+"功能开始...");
		
		if(T2util==null || T2util.getClient()==null){
			throw new Exception("无法调用T2服务，t2sdk没有启动成功，请检查配置并重启。");
		}
		
		IEvent event = new EventFactory().getEventByAlias(functionId, EventType.ET_REQUEST);
		event.putEventData(senddata);
		
		try{
			IEvent resultEvent = T2util.getClient().sendReceive(event);
			if (resultEvent.getReturnCode() == EventReturnCode.I_OK) {
			IDatasets result = resultEvent.getEventDatas();
			int datasetCount = result.getDatasetCount();
			System.out.println("datasetCount="+datasetCount);
			System.out.println("datasetCount="+result.getDataset(0).getTotalCount());
			System.out.println("datasetCount="+result.getDataset(0).getString("TotalCount"));
			
			if(datasetCount>0){
				
				for (int i = 0; i < datasetCount; i++) {
					
					System.out.println("dataset - " + result.getDatasetName(i));
					// 打印IDataset
					DatasetService.printDataset(result.getDataset(i));
					System.out.println(result.getDataset(i));
				}
				
				return result;
			}
			}}
		catch(T2SDKException e){
			System.out.println("Exceptiion happended"+e.getMessage());
		}
		return null;
		// 同步服务调用带指定超时
//		try {
//			IEvent resultEvent = T2util.getClient().sendReceive(event);
//			
//			if (resultEvent.getReturnCode() == EventReturnCode.I_OK) {
//				IDatasets result = resultEvent.getEventDatas();
//				int datasetCount = result.getDatasetCount();
//				System.out.println("datasetCount="+datasetCount);
//				System.out.println("datasetCount="+result.getDataset(0).getTotalCount());
//				System.out.println("datasetCount="+result.getDataset(0).getString("TotalCount"));
//				
//				if(datasetCount>0){
//					
//					for (int i = 0; i < datasetCount; i++) {
//						
//						System.out.println("dataset - " + result.getDatasetName(i));
//						// 打印IDataset
//						DatasetService.printDataset(result.getDataset(i));
//						System.out.println(result.getDataset(i));
//					}
//					
//					return result;
//				}else{
//					return null;
//				}
//			}else{
//				System.out.println("调用"+functionId+"功能失败，失败原因:["+resultEvent.getErrorNo()+"]"+resultEvent.getErrorInfo());
//				return null;
//			}
//		} catch (Exception e) {
//			logger.info("调用"+functionId+"功能失败:"+e.getMessage(),e);
//			e.printStackTrace();
//			return null;
//		}
	}
	
	
	
	
	public static final void printEvent(IEvent resultEvent)
	{
		System.out.println("returnCode: " + resultEvent.getReturnCode());
		System.out.println("errorNo: " + resultEvent.getErrorNo());
		System.out.println("errorInfo: " + resultEvent.getErrorInfo());

		if (resultEvent.getReturnCode() == EventReturnCode.I_OK) {
			IDatasets result = resultEvent.getEventDatas();
			int datasetCount = result.getDatasetCount();
			System.out.println("datasetCount="+datasetCount);
			System.out.println("datasetCount="+result.getDataset(0).getTotalCount());
			System.out.println("datasetCount="+result.getDataset(1).getTotalCount());
			
			for (int i = 0; i < datasetCount; i++) {
				System.out.println("dataset - " + result.getDatasetName(i));
				// 打印IDataset
				DatasetService.printDataset(result.getDataset(i));
				System.out.println();
			}
		}
	}
	
	
	
	/**
	 * 将datasets转换成List（存放Map类型）
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List<Map> dataset2MapList(IDatasets requests) throws Exception {
		IDataset request = requests.getDataset(0);
		List<Map> result = new ArrayList<Map>();
		if (request == null) {
			return null;
		}
		request.beforeFirst();
		while (request.hasNext()) {
			request.next();
			Map map = new HashMap();
			for (int i = 0; i <= request.getColumnCount(); i++) {
				String key = request.getColumnName(i);
				String value = StringUtils.trim(request.getString(key));
				if (StringUtils.isBlank(value)) {
					value = "";
				}
				map.put(key, value);
			}
			result.add(map);
			
		}
		return result;
	}

}

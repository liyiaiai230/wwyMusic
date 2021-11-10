import { baseUrl} from "./config";
export function topList(){

	let listIds = ['3','0','2','1'];

	return new Promise(function (resolve,reject){
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4
				for (let i=0; i< listIds.length;i++){
					result[i].listId = listIds[i];
				}
				resolve(result)
			},
			fail: () => {},
			complete: () => {}
		});
	});

}
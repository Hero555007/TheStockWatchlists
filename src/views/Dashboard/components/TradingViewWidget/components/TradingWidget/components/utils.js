import { timeParse } from "d3-time-format";
import { parse } from "uuid";
import {gethistoricalprice} from '../../../../../../../services/api/httpclient'

const parseDate = timeParse("%Y-%m-%d %H:%M:%S");
const parseDate1 = timeParse("%Y-%m-%d");
const apikey = "fb74fb8e61050129a7ccaa0fb715e2fa";
function parseMyData(data)
{
	data.forEach(element => {
		//element.date = new Date(parts[0], parts[1]-1, parts[2], 0, 0, 0);
		element.date = parseDate(element.date);
	});
	data.columns = ["open", "high", "low", "close", "volume"];
	return data.reverse();
}
function parseMyData1(data)
{
	data.forEach(element => {
		//element.date = new Date(parts[0], parts[1]-1, parts[2], 0, 0, 0);
		console.log(element.date, typeof(element.date))
		element.date = parseDate1(element.date.toString());
		console.log(element.date)
	});
	data.columns = ["open", "high", "low", "close", "volume"];
	return data.reverse();
}
// export function getData() {
// 	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
// 		.then(response => response.text())
// 		.then(data => tsvParse(data, parseData(parseDate)))
// 	return promiseMSFT;
// }
export function getData(symbolname, intervalname) {
	let payload = {
		'symbol' : symbolname,
		'interval' : intervalname
	}
	if (intervalname === "1d")
	{
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData1(data['data']['data']);
			}
		})
		return promiseMSFT;
		// const promiseMSFT = fetch("https://financialmodelingprep.com/api/v3/historical-price-full/"+symbolname+"?apikey="+apikey)
		// .then(response => response.json())
		// .then(data => parseMyData1(data['historical']))
		// return promiseMSFT;
	}
	else if(intervalname === "4h"){
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData(data['data']['data']);
			}
		})
		return promiseMSFT;
	}
	else if(intervalname === "1h"){
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData(data['data']['data']);
			}
		})
		return promiseMSFT;
	}
	else if(intervalname === "30m"){
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData(data['data']['data']);
			}
		})
		return promiseMSFT;
	}
	else if(intervalname === "15m"){
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData(data['data']['data']);
			}
		})
		return promiseMSFT;
	}
	else if(intervalname === "5m"){
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData(data['data']['data']);
			}
		})
		return promiseMSFT;
	}
	else{
		const promiseMSFT = gethistoricalprice(payload).then(data=>{
			if (data['data']['result'] == 'ok'){
				// console.log("historicalpricedata1", parseMyData1(data['data']['data']));
				return parseMyData(data['data']['data']);
			}
		})
		return promiseMSFT;
	}
}

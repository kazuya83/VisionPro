import axios from "axios";
import Const from "./Const";

const CommonFunc = {
    GetLocalStrage: (property) => {
        return localStorage.getItem(property);
    },
    SetLocalStrage: (property, value) => {
        localStorage.setItem(property, value);
    },
    IsEmpty: (value) => {
        return value === null || value === undefined || value.length === 0;
    },
    GetData: async (endPoint, param) => {
        const url = Const.API.URL + endPoint;
        let retData;
        
        await axios.get(url).then((res) => {
			retData = res.data;
		});

        return retData;
    },
    PostData: async (endPoint, param) => {
        const url = Const.API.URL + endPoint;
        let retData;
        await axios.post(url, param).then((res) => {
            retData = res.data;
        });
        return retData;
    },
    ConverterJSONpParse: (obj) => {
        if (typeof obj === 'string') {
            return JSON.parse(obj);
        }
        return obj;
    },
    ReplaceCommaNumber: (num) => {
        return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
};

export default CommonFunc;
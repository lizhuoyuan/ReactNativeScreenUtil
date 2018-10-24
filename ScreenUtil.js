/**
 * zhuoyuan93@gmail.com
 * 屏幕工具类 以及一些常用的工具类封装
 * ui设计基准,iphone 6 2倍图
 * width:750px
 * height:1334px
 * @2x
 */
import {
    PixelRatio,
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size: Number) {
    return size * _scaleWidth;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size: Number) {
    return size * _scaleHeight;
}

/* 最初版本尺寸适配方案 也许你会更喜欢这个
export function scaleSize(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}*/

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px , allowFontScaling 是否根据设备文字缩放比例调整，默认不会
 * @returns {Number} 返回实际sp
 */
function setSpText(size: Number, allowFontScaling = false) {
    const scale = Math.min(_scaleWidth, _scaleHeight);
    const fontSize = allowFontScaling ? 1 : fontScale;
    return size * scale / fontSize;
}

export function setSpText2(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));

    return size / DEFAULT_DENSITY * fontScale;
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}


/**
 * 判断对象，数组，字符串是否为空
 * @param str  (null|undefined|''|'   '|[]|{}) 均判断为空，返回true
 * @returns {boolean}
 */
export function isEmpty(str) {
    if (!str) {
        return true;
    } else if (typeof str === 'object' && Object.keys(str).length === 0) {
        return true;
    } else if (str.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
        return true;
    }
    return false;
}

//时间处理
Date.prototype.format = function (format) {
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

//获取时间差 current:1497235409744 当前时间  start:1497235419744 开始时间
export function getRemainingime(current: Number, start: Number) {

    let time = start - current;
    if (time < 0) {
        return ["0", "0", "0", "0", "0", "0"];
    }
    let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000));//年

    let month = Math.floor(time / (30 * 24 * 3600 * 1000));//月

    let days = Math.floor(time / (24 * 3600 * 1000));//日
    let temp1 = time % (24 * 3600 * 1000);
    let temp2 = temp1 % (3600 * 1000);
    let minutes = Math.floor(temp2 / (60 * 1000));//分
    let hours = Math.floor(temp1 / (3600 * 1000));//时
    let temp3 = temp2 % (60 * 1000);
    let seconds = Math.round(temp3 / 1000);//秒

    let strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
    return strs;//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

//1497235419
export function getRemainingimeDistance(distance: Number) {
    let time = distance * 1000;
    if (time < 0) {
        return ["0", "0", "0", "0", "0", "0"];
    }

    let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000));//年

    let month = Math.floor(time / (30 * 24 * 3600 * 1000));//月

    let days = Math.floor(time / (24 * 3600 * 1000));//日
    let temp1 = time % (24 * 3600 * 1000);
    let hours = Math.floor(temp1 / (3600 * 1000));//时
    let temp2 = temp1 % (3600 * 1000);
    let minutes = Math.floor(temp2 / (60 * 1000));//分
    let temp3 = temp2 % (60 * 1000);
    let seconds = Math.round(temp3 / 1000);//秒

    let strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
    // strs.splice(0, 1, String(Number(strs[0]) - 1970));//年
    // strs.splice(1, 1, String(Number(strs[1]) - 1));
    // strs.splice(2, 1, (Number(strs[2]) - 1) < 10 ? '0' + (Number(strs[2]) - 1) : String(Number(strs[2]) - 1));
    // strs.splice(3, 1, (Number(strs[3]) - 8) < 10 ? '0' + (Number(strs[3]) - 8) : String(Number(strs[3]) - 8));
    // strs.splice(4, 1, Number(strs[4]) < 10 ? '0' + Number(strs[4]) : String(Number(strs[4])));
    // strs.splice(5, 1, Number(strs[5]) < 10 ? '0' + Number(strs[5]) : String(Number(strs[5])));
    return strs;//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

export function toNormal(time: Number) {
    return time >= 10 ? time : '0' + time;
}

//转换成日期
export function toDate(timestamp: Number, format1 = 'yyyy-MM-dd hh:mm:ss') {
    try {
        if (timestamp > 10000) {
            let date = new Date();
            date.setTime(timestamp);
            return date.format(format1);//2014-07-10 10:21:12
        } else {
            return '';
        }
    } catch (erro) {
        return '';
    }
    return '';
}

//转换成时间搓
export function toTimestamp(date: String) {
    let timestamp = Date.parse(date);
    return timestamp / 1000;  // 1497233827569/1000
}

//CST时间=>转换成日期yyyy-MM-dd hh:mm:ss
export function getTaskTime(strDate) {
    if (null == strDate || "" == strDate) {
        return "";
    }
    let dateStr = strDate.trim().split(" ");
    let strGMT = dateStr[0] + " " + dateStr[1] + " " + dateStr[2] + " " + dateStr[5] + " " + dateStr[3] + " GMT+0800";
    let date = new Date(Date.parse(strGMT));
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;

    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};

//1497235419
export function getRemainingimeDistance2(distance: Number) {
    let time = distance;
    let days = Math.floor(time / (24 * 3600 * 1000));
    let temp1 = time % (24 * 3600 * 1000);
    let hours = Math.floor(temp1 / (3600 * 1000));
    let temp2 = temp1 % (3600 * 1000);
    let minutes = Math.floor(temp2 / (60 * 1000));
    if (time <= 60 * 1000) {
        minutes = 1;
    }
    let temp3 = temp2 % (60 * 1000);
    let seconds = Math.round(temp3 / 1000);
    return [hours, minutes];//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}


/**
 * 存储
 * @param key
 * @param value
 * @param successCallback
 * @param errorCallback
 */
export function saveAsyncStorage(key, value, successCallback, errorCallback) {
    AsyncStorage.setItem(key, value, error => {
        if (error) {
            errorCallback(error);
        }
        else {
            successCallback();
        }
    })
}

/**
 * 取值
 * @param key
 * @param successCallback
 * @param errorCallback
 */
export function getAsyncStorage(key, successCallback, errorCallback) {
    AsyncStorage.getItem(key, (error, result) => {
        if (error) {
            errorCallback(error);
        }
        else {
            successCallback(result);
        }
    })
}

/**
 * 删除对应key的
 * @param key
 * @param successCallback
 * @param errorCallback
 */
export function removeAsyncStorage(key, successCallback, errorCallback) {
    AsyncStorage.getItem(key, error => {
        if (error) {
            errorCallback(error);
        }
        else {
            successCallback();
        }
    })
}

//
// // 将当前时间换成时间格式字符串
// var timestamp3 = 1403058804;
// var newDate = new Date();
// newDate.setTime(timestamp3);
// // Wed Jun 18 2014
// console.log(newDate.toDateString());
// // 2014-06-18T02:33:24.000Z
// console.log(newDate.toISOString());
// // 2014-06-18T02:33:24.000Z
// console.log(newDate.toJSON());
// // 2014年6月18日
// console.log(newDate.toLocaleDateString());
// // 2014年6月18日 上午10:33:24
// console.log(newDate.toLocaleString());
// // 上午10:33:24
// console.log(newDate.toLocaleTimeString());
// // Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
// console.log(newDate.toString());
// // 10:33:24 GMT+0800 (中国标准时间)
// console.log(newDate.toTimeString());
// // Wed, 18 Jun 2014 02:33:24 GMT
// console.log(newDate.toUTCString());
// // 2014-07-10 10:21:12
// console.log(newDate.format('yyyy-MM-dd h:m:s'))

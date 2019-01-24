/**
 * Created by iceld on 2017/6/27.
 */

var utils = {
  isEmpty: function(strSrc) {
    if(strSrc == null || strSrc == undefined) {
      return true;
    } else {
      if(strSrc.indexOf(' ') >= 0)
        strSrc = strSrc.replace(/^(\s|\u00A0)+/, '');
      if(strSrc == "") return true;
    }
    return false;
  },
  isNumber: function(strSrc) {
    var reg = /^\d+$/;
    if(!reg.exec(strSrc)) {
      return false;
    }
    return true
  },
  isMoney: function(strSrc) {
    //var reg = /^(([1-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))|0(\.[0-9]{1,2})|0$/;
    var reg = /^\d{11}$/;
    if(!reg.test(strSrc)) {
      return false;
    }
    return true;
  },
  isPhone: function(strSrc) {
    //var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var reg = /^1\d{10}$/;
    if(!reg.exec(strSrc)) {
      return false;
    }
    return true
  },
  isEmail: function(strSrc) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if(!reg.exec(strSrc)) {
      return false;
    }
    return true
  },
  isIDCard: function(strSrc) {
    var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    if(!reg.test(strSrc)) {
      return false;
    }
    return true;
  },
  isBankCard: function(strSrc) {
    var reg = /^[0-9]{16,19}$/;
    if(!reg.test(strSrc)) {
      return false;
    }
    return true;
  },
  trim: function(strSrc) {
    var str = strSrc.replace(/^(\s|\u00A0)+/, '');
    for(var i = str.length - 1; i >= 0; i--) {
      if(/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
  },
  strLen: function(strSrc) {
    var len = 0;
    for(var i = 0; i < strSrc.length; i++) {
      var c = strSrc.charCodeAt(i);
      //单字节加1
      if((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  },
  subStr: function(str, num) {
    var that = this,
      _str = str;
    if(that.strLen(str) > num) {
      _str = str.substr(0, num) + '...';
    }
    return _str;
  },
  replace: function(strSrc, mathStr, repStr) {},
  isContains: function(strSrc, matchStr) {
    if(strSrc.indexOf(matchStr) >= 0) {
      return true;
    }
    return false;
  },
  getUrlParam: function(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //var r = window.location.search.substr(1).match(reg);
    var r = url.substr(1).match(reg);
    if(r != null) {
      return unescape(r[2]);
    }
    return null
  }
}

export { utils }

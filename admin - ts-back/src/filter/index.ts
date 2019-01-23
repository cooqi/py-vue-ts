
export function formatDateTime (time) {
  //格式化时间戳
  if(time){
    var oDate=new Date();
    oDate.setTime(time);

    var y=oDate.getFullYear();
    var m=oDate.getMonth()+1;
    var d=oDate.getDate();

    var h=oDate.getHours();
    var mm=oDate.getMinutes();
    var s=oDate.getSeconds();

    return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
  }
}


//去空格
export function trim(strSrc) {
  var str = strSrc.replace(/^(\s|\u00A0)+/, '');
  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return str;
}

//执法状态
export function statu(i) {
  let str=''
  if(i==1){
    str='有效'
  }else if(i==2){
    str='无效'
  }
  return str;
}

//检查结果-任务事项状态
export function grade(i) {
  let str=''
  if(i=='0'){
    str='不合格'
  }else if(i=='1'){
    str='合格'
  }
  return str;
}


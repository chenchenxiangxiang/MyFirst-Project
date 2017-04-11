/*
* 工具;
* */

/**
 * 小于10的数字加0
 *
 * */
function addZero(num){
    if(typeof num!="number"){
        num="addZero参数类型错误";
    }else{
        num=num<10?"0"+num:""+num;
    }
    return num;
}
/**
 * 根据id获取元素
 * 替代document.getElementById()
 *
 * */
function getID(_id){
    var element=document.getElementById(_id);
    if(element){
        return element;
    }else{
        return "元素为空";
    }
}
/**
 * 创建表格
 * @param {String} row
 * @param {String} col
 * */
function createTable(row,col){
    var str="<table>";
    for(var i=0;i<row;i++){
        str+="<tr>";
        for(var j=0;j<col;j++){
            str+="<td>j</td>";
        }
        str+="</tr>";
    }
    str+="</table>";
    return str;
}
/**
 * 获取窗口的尺寸、
 * @returns {Object}
* */
function getWindowSize(){
    return{
        "width":document.documentElement.clientWidth||window.innerWidth,
        'height':document.documentElement.clientHeight||window.innerHeight
    }
}
/**
 * 获取滚动条的尺寸
 * @returns {Object}
* */
function getScrollSize(){
    return{
        "top":document.documentElement.scrollTop||document.body.scrollTop,
        "left":document.documentElement.scrollLeft||document.body.scrollLeft
    }
}
/**
 * 元素居中
 * */
function center(element){
    element.style.left=((getWindowSize().width-element.offsetWidth)/2+getScrollSize().left)+"px";
    element.style.top=((getWindowSize().height-element.offsetHeight)/2+getScrollSize().top)+"px"
}
/**
 *事件对象的兼容性处理
 * IE下：window.event
 * 其它：_evt
* */
function handleEvent(_evt){
    //window.event：为真，ie下
    if(window.event){
        return window.event;
    }else{
        return _evt;
    }
    //return _evt=_evt||window.event;
}
/**
 * 跨浏览器的阻止默认动作
 * */
function preventDefault(evt){
    if(window.event){
        //ie下的阻止默认动作
        window.event.returnValue=false;
    }else{
        //其它浏览器下的阻止默认动作;
        evt.preventDefault();
    }
}
/**
 * 跨浏览器的阻止事件冒泡
* */
function stopPropagation(evt){
    //IE
    if(window.event){
        window.event.cancelBubble=true;
    }else{
        evt.stopPropagation();
    }
}
/**
 * 获取鼠标选择的文本
 * */
function getSelectionTxt(){
    var txt=null;
    if(window.getSelection){
        txt=window.getSelection();
    }else if(document.selection){
        txt=document.selection.createRange().text;
    }else if(document.getSelection){
        txt=document.getSelection();
    }
    return txt;
}
/**
 * 元素消失
 * @param element
 * @param t
 */
function fadeOut(element,t=10){
    var num=1;
    var timer=setInterval(function(){
        num-=0.001;
        //标准浏览器
        if(typeof element.style.opacity=='string'){
            element.style.opacity=num;
        }else{
            element.style.filter="alpha(opacity="+num*100+")";
        }
        if(num<=0){
            clearInterval(timer);
        }
        //console.log(num);
    },t);
}
/**
 * 元素显示
 * @param element
 * @param t
 */
function fadeIn(element,t=10){
    var num=0;
    var timer=setInterval(function(){
        num+=0.001;
        //标准浏览器
        if(typeof element.style.opacity=='string'){
            element.style.opacity=num;
        }else{
            element.style.filter="alpha(opacity="+num*100+")";
        }
        if(num>=1){
            clearInterval(timer);
        }
        //console.log(num);
    },t);
}
/**
 * 重定向，页面结构和样式是固定
 * 反馈信息
 * 不同状态有不同颜色，可跳转和不跳转
 * @param _msg
 * @param flag
 * <div class="redirect">
 *<div class="redirect_header">
 *<span id="msg">删除成功</span>
 *<span id="countdown"></span>
 *</div>
 *<div class="redirect_body">
 *<div class="progress_bar"></div>
 *<div class="percent">0%</div>
 *</div>
 *<div class="redirect_footer">页面跳转中，请稍后...</div>
 *</div>
 *重定向
*.redirect{
*width:300px;
*height:150px;
    border:1px solid #ddd;
    position:absolute;
    box-shadow:0 0 3px #ddd;
    box-sizing: border-box;
    z-index:10000;
}
.redirect_header{
    height:30px;
    line-height:30px;
    border-bottom:1px solid #ddd;
}
.redirect_body{
    height:90px;
}
.redirect_footer{
    height:25px;
    line-height:25px;
    text-align:right;
    border-top:1px solid #ddd;
    font-size:12px;
}
.progress_bar{
    height:15px;
    background:#369;
    width:0%;
    transition:width 0.2s linear;
}
#countdown{
    display:inline-block;
    width:15%;
    text-align:right;
}
#msg{
    display:inline-block;
    width:80%;
}
 */
function redirect(_msg,url,flag){
    var redirect=document.querySelector(".redirect");
    var countdown=document.querySelector("#countdown");
    var msg=document.querySelector("#msg");
    //类名称为percent的div
    var percent=document.querySelector(".percent");
    //获取进度条div
    var progress_bar=document.querySelector(".progress_bar");
    //把用户的信息显示在header上
    if(flag==1){
        msg.innerHTML=_msg;
        msg.style.color="green";
    }else if(flag==0){
        msg.innerHTML=_msg;
        msg.style.color="red";
    }
    //redirect居中
    center(redirect);
    var duration=5;
    var p=0;
    var timer=setInterval(function(){
        duration--;
        if(duration==0){
            clearInterval(timer);
            redirect.style.display="none";
            if(flag==1){
                //跳转
                location.href=url;
            }
        }
        //倒计时的值赋给countdown元素
        countdown.innerHTML=duration;
        //console.log(num);
        p++;
        //百分比赋给div，显示在页面上
        percent.innerHTML=parseInt((p/5*100))+"%";
        //设置进度条的百分比
        progress_bar.style.width=parseInt((1/4)*100)*p+"%";
    },100)
}
/**
 * 创建ajax对象
 * @returns {*}
 */
function createXMLHttpRequest(){
    var xmlHttp;
    if(window.ActiveXObject){
        xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
    }else{
        xmlHttp=new XMLHttpRequest();
    }
    return xmlHttp;
}


/**
 * 修剪空格
 * @returns {*}
 */
function trim(content){
            //空格  内容  空格
            var pattern=/^\s*(.+?)\s*$/g;
            content=content.replace(pattern,"$1");
            return content;
    }


/**
 * 邮箱验证
 *@param content
 * @returns {*}
 */
function email_validate(content){
                var pattern=/^[a-z0-9]+([\._-][a-z0-9]+)?@[a-z0-9]+([_-][a-z0-9]+)?\.[a-z0-9]{2,4}(\.[a-z]{2,4})?$/i;
                if(content){
                        if(!pattern.test(content)){
                        return false;
                    }
                }
                return true;
        }

/**
 * 密码验证
 *@param content
 * @returns {*}
 */
function pwd_validate(content){
        var num=0;
          if(!/[\d]/.test(content)){
            num+=1;
          }  
          if(!/[a-z]/.test(content)){
            num+=1;
          }
          if(!/[A-Z]/.test(content)){
            num+=1;
        }
          if(!/[\W]/.test(content)){
            num+=1;
            }
            return num;
        }
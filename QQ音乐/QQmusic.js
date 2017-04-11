/*地区tab页*/
$(".middle_Tab .middle_Tab_ul li").each(function(index){
       $(this).click(function(){
           $(".middle_Tab .middle_Tab_ul li").removeClass("active").eq(index).addClass("active");
           $(".middle_info").css({"display":"none"});
           $(".middle_info").eq(index).css({"display":"block"});
       })
   });
/********************************************************/


/*触摸图片使相应的文字背景变色*/
/*$(".middle_info_pic div").each(function(index){
    //console.log($(".middle_info_pic div").length)
    $(this).mouseover(function(){
        //console.log(1);
        $(".middle_info_word div").eq(index).css({"background":"#32c27d"});
    });
    $(this).mouseout(function(){
        $(".middle_info_word div").eq(index).css({"background":"rgba(0,0,0,0)"});
    })
});*/
var middle_info_pic=document.querySelectorAll(".middle_info_pic>div");
var middle_info_word=document.querySelectorAll(".middle_info_word>div");
for(var i=0;i<middle_info_pic.length;i++){
    middle_info_pic[i].setAttribute("index",i);
    middle_info_pic[i].addEventListener("mouseover",function(){
        var index=this.getAttribute("index");
        middle_info_word[index].style.background="#32c27d";
    });
    middle_info_pic[i].addEventListener("mouseout",function(){
        var index=this.getAttribute("index");
        middle_info_word[index].style.background="rgba(0,0,0,0)";
    });
    middle_info_word[i].addEventListener("mouseover",function(){
        this.style.background="#32c27d";
    });
    middle_info_word[i].addEventListener("mouseout",function(){
        this.style.background="rgba(0,0,0,0)";
    });
}
/***********************************************************/

/*触摸图片icon出现和隐藏*/
$(".middle_info_pic>div").each(function(index){
    //console.log(index);
    $(this).mouseover(function(){
        $(".middle_info_word>div").eq(index).find('.icon-word').fadeIn(500)
    });
    $(this).mouseout(function(){
        $(".middle_info_word>div").eq(index).find('.icon-word').fadeOut(400)
    });
});
/*******************************************************/


/*触摸图片使放大*/
$(".middle_info_pic>div").each(function(index){
    $(this).mouseover(function() {
        $(".middle_info_pic>div").eq(index).find('img:first').css({
            "transform":"scale(1.08,1.08)",
            "transition":"all 1s ease"
        })
    });
    $(this).mouseout(function() {
        $(".middle_info_pic>div").eq(index).find('img:first').css({
            "transform":"scale(1,1)",
            "transition":"all 1s ease"
        })
    })
});
/*********************************************************/

/*触摸图片出现播放按钮*/
$(".middle_info_pic>div").each(function(index){
    $(this).mouseover(function() {
        $(".middle_info_pic>div").eq(index).find('i>img').fadeIn(500)
        $(".middle_info_pic>div").eq(index).find('i>img').css({
            "width":"70px",
            "height":"70px",
            "cursor":"pointer"
        })
    });
    $(this).mouseout(function() {
        $(".middle_info_pic>div").eq(index).find('i>img').fadeOut(500)
    });
});
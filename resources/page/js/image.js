$(document).ready(function () { 
  //提交图片剪切信息到后台
  $("#subPhoto").click(function(){
      var x1 = $("input[name='x1']").val();
      var y1 = $("input[name='y1']").val();
      var x2 = $("input[name='x2']").val();
      var y2 = $("input[name='y2']").val();
      var img64 = $("#imghead").attr("src");
      alert(x1+":"+y1+":"+x2+":"+y2);
      var url = "";
      var param = {
        'x1': x1,
        'y1': y1,
        'x2': x2,
        'y2': y2,
        'image': img64
      }
      $.post(url,param,function(data){
        alert(data);
      });
  })

}); 

//点击图像区域选择图片
function changeImg(obj){
  //图片选择处理
  var file = obj;
  var MAXWIDTH  = 198; 
  var MAXHEIGHT = 198;
  var MAXSIZE = 2048*1024;
  var div = document.getElementById('preview');
  if (file.files && file.files[0]){
    if (file.files[0].size > MAXSIZE) {
      alert("more than " + (MAXSIZE/1024/1024) + "M");
      return false;
    };
    div.innerHTML ='<img id=imghead>';
    var img = document.getElementById('imghead');
    img.onload = function(){
       var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
       img.width  =  rect.width;
       img.height =  rect.height;
       img.style.marginTop = rect.top+'px';
    }
    var reader = new FileReader();
    reader.onload = function(evt){
      img.src = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
  }

  //图片剪切区域处理
  $('#imghead').imgAreaSelect({ 
      x1:0, 
      y1:0, 
      x2:100, 
      y2:100, 
      aspectRatio: '1:1', //比例
      handles: true, 
      onSelectChange: function(img, selection){//图片剪切区域变化时触发
        $("#imgmsg").html("x1:"+selection.x1+", y1:"+selection.y1+", x2:"+selection.x2+", y2:"+selection.y2);
      }, 
      onSelectEnd: function (img, selection) {//图片剪切区域结束时触发
        $('input[name="x1"]').val(selection.x1);
        $('input[name="y1"]').val(selection.y1);
        $('input[name="x2"]').val(selection.x2);
        $('input[name="y2"]').val(selection.y2);
     }
  }); 
}

//设置图片显示区域为固定大小,方便后台按统一比例截取图片
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
   var param = {top:0, left:0, width:width, height:height};
   if( width>maxWidth || height>maxHeight ){
     rateWidth = width / maxWidth;
     rateHeight = height / maxHeight;
     if( rateWidth > rateHeight ){
         param.width =  maxWidth;
         param.height = Math.round(height / rateWidth);
     }else {
         param.width = Math.round(width / rateHeight);
         param.height = maxHeight;
     }
   }
   param.left = Math.round((maxWidth - param.width) / 2);
   param.top = Math.round((maxHeight - param.height) / 2);
   return param;
}
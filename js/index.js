$(document).ready(function(){
    $("#myNav").affix({
        offset: { 
            top: 125 
      }
    });
// });

  var drag=function(obj){  
              
                obj.bind("mousedown",start);  
  
                function start(event){  
                    if(event.button==0){//判断是否点击鼠标左键  
                        /*  
                         * clientX和clientY代表鼠标当前的横纵坐标  
                         * offset()该方法返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。  
                         * bind()绑定事件，同样unbind解绑定，此效果的实现最后必须要解绑定，否则鼠标松开后拖拽效果依然存在  
                         * getX获取当前鼠标横坐标和对象离屏幕左侧距离之差（也就是left）值，  
                         * getY和getX同样道理，这两个差值就是鼠标相对于对象的定位，因为拖拽后鼠标和拖拽对象的相对位置是不变的  
                         */  
                        gapX=event.clientX-obj.offset().left;  
                        gapY=event.clientY-obj.offset().top;  
                        //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的  
                        $(document).bind("mousemove",move);  
                        //此处的$(document)可以改为obj  
                        $(document).bind("mouseup",stop);  
                         
                    }  
                    return false;//阻止默认事件或冒泡  
                }  
                function move(event){  
                    obj.css({  
                        "left":(event.clientX-gapX)+"px",  
                        "top":(event.clientY-gapY)+"px"  
                    });  
                    return false;//阻止默认事件或冒泡  
                }  
                function stop(){  
                    //解绑定，这一步很必要，前面有解释  
                    $(document).unbind("mousemove",move);  
                    $(document).unbind("mouseup",stop);  
                      
                }  
            }  
            obj=$("#menu_btn");  
            drag(obj);//传入的必须是jQuery对象，否则不能调用jQuery的自定义函数  

            var window_width=$(window).width(); 
			var window_height=$(window).height();
			var btn_width=$('#btn_btn').width();
			var btn_height=$('#btn_btn').height();
			var fin_width=window_width-btn_width;
			var fin_height=window_height-btn_height;

			//console.log(btn_width,btn_height);
            
            var endPosition, startPosition;

				$("#menu_btn").on('touchstart',function(e){
					$("#container").css({
						   "overflow":"hidden"
						 });	

					var touch = e.touches[0];
				    startPosition = {
				        x: touch.clientX,
				        y: touch.clientY
				    }			
				})


				$("#menu_btn").on('touchmove', function (e) {
					e.preventDefault();
					
					//console.log('2',endPosition);
				    var touch = e.touches[0];
				    endPosition = {
				        x: touch.clientX,
				        y: touch.clientY
				    }
				    //console.log(endPosition);

				    if (endPosition.x < fin_width && endPosition.x >0 && endPosition.y < fin_height && endPosition.y>0) {
					    $("#menu_btn").css({  
						                        "left": endPosition.x+"px",  
						                        "top": endPosition.y+"px"  
						                    });
					    }

					else{
						  $("#menu_btn").css({  
						                        "left": startPosition.x+"px",  
						                        "top": startPosition.y+"px"  
						                    });
					}




					$("#menu_btn").on('touchend',function(e){
					 $("#container").css({
						   "overflow":"auto"
						 });			
				})




				});





});

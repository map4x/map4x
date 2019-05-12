var copiedObject;var copiedObjects=new Array();var canvasScale=1;var SCALE_FACTOR=1.2;var reader=new FileReader();function stopDrag(){let object=this.canvas.getActiveObject();object.lockMovementX=!0;object.lockMovementY=!0;object.evented=!1}
function startDrag(){let object=this.canvas.getActiveObject();object.lockMovementX=!1;object.lockMovementY=!1;object.evented=!0}
function Copy(){canvas.getActiveObject().clone(function(cloned){_clipboard=cloned})}
function Paste(){_clipboard.clone(function(clonedObj){canvas.discardActiveObject();clonedObj.set({left:clonedObj.left+10,top:clonedObj.top+10,evented:!0,});if(clonedObj.type==='activeSelection'){clonedObj.canvas=canvas;clonedObj.forEachObject(function(obj){canvas.add(obj)});clonedObj.setCoords()}else{canvas.add(clonedObj)}
_clipboard.top+=10;_clipboard.left+=10;canvas.setActiveObject(clonedObj);canvas.requestRenderAll()})}
var canvas=new fabric.Canvas('canvas',{isDrawingMode:!1,serializeBgOverlay:!0});var ctx=canvas.getContext("2d");var line,isDown;fabric.StaticCanvas.prototype._toObjectMethod=function(methodName,propertiesToInclude){var data={objects:this._toObjects(methodName,propertiesToInclude)};if(this.serializeBgOverlay){fabric.util.object.extend(data,this.__serializeBgOverlay(methodName,propertiesToInclude))}
fabric.util.populateWithProperties(this,data,propertiesToInclude);return data}
$("#canvas2json").click(function(){var json=canvas.toJSON();$("#textareasave").text(JSON.stringify(json))});$("#loadJson2Canvas").click(function(){canvas.loadFromJSON($("#textareaopen").val(),canvas.renderAll.bind(canvas))});var canvasWrapper=document.getElementById('canvas-wrapper');var canvasWrapperWidth=canvasWrapper.clientWidth;var canvasWrapperHeight=canvasWrapper.clientHeight;var aspectRatio=0;canvas.setWidth(canvasWrapperWidth);canvas.setHeight(canvasWrapperHeight);canvas.backgroundColor='#1b1b1b';canvas.renderAll();$("[data-toggle='tooltip']").tooltip({delay:{show:500,hide:100},placement:"bottom"});function randomColor(){return'#'+Math.floor(Math.random()*16777215).toString(16)}
canvas.on("mouse:down",function(){var obj=canvas.getActiveObject();if(!obj){$("li").removeClass("actived")}});function layerobj(){var id=canvas.getObjects().length-1;var obj=canvas.item(id);$("#containerLayers").prepend('<li id="'+id+'" class="ui-state-default"><span class="ui-icon ui-icon-arrow-2-n-s"></span> item '+id+'</li>');$("#"+id).click(function(evt){if($(this).hasClass("actived")){$("li").removeClass("actived");canvas.discardActiveObject();canvas.renderAll()}
else{$("li").removeClass("actived");canvas.discardActiveObject();canvas.renderAll();$(this).addClass("actived");canvas.setActiveObject(obj);canvas.renderAll()}});obj.on('selected',function(){$("li").removeClass("actived");$("#"+id).addClass("actived")})}
$("#containerLayers").sortable({change:function(event,ui){console.log(event,ui)}});$("#containerLayers").disableSelection();var fillcolor="rgb(255,0,0)";var strokecolor="rgb(255,0,0)";var mystrokewidth=0;var myopacity=100;function changefill(e){fillcolor=this.value}
function changestroke(e){canvas.freeDrawingBrush.color=drawingColorEl.value;strokecolor=this.value}
function changestrokewidth(e){var cur_value=parseInt($(this).val());canvas.freeDrawingBrush.width=parseInt(drawingLineWidthEl.value,10)||1;mystrokewidth=cur_value}
function changeopacity(e){var cur_value=parseInt($(this).val());myopacity=this.value}
document.getElementById("fill").onchange=changefill;document.getElementById("stroke").onchange=changestroke;document.getElementById("control_border").onchange=changestrokewidth;document.getElementById("control_opacity").onchange=changeopacity;$('#fill').change((e)=>{let obj=this.canvas.getActiveObject();let fdb=canvas.freeDrawingBrush.color;let $this=$(e.currentTarget);obj.setColor($this.val());canvas.renderAll()});$('#stroke').change((e)=>{let obj=this.canvas.getActiveObject();let fdbc=canvas.freeDrawingBrush.color;let $this=$(e.currentTarget);obj.set('stroke',$this.val());fdbc=$this.val();canvas.renderAll()});$('#control_border').change(function(){var cur_value=parseInt($(this).val());var activeObj=canvas.getActiveObject();let fdbw=canvas.freeDrawingBrush.width;activeObj.set({strokeWidth:cur_value,fdbw:cur_value});canvas.renderAll()});$('#control_opacity').change(function(){var cur_value=parseInt($(this).val());var activeObj=canvas.getActiveObject();activeObj.set({opacity:this.value,});canvas.renderAll()});window.downloadSvg=()=>{pushDownload('test.svg',canvas.toSVG({viewBox:{x:0,y:0}}))}
function pushDownload(filename,text){var pom=document.createElement('a');pom.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));pom.setAttribute('download',filename);if(document.createEvent){var event=document.createEvent('MouseEvents');event.initEvent('click',!0,!0);pom.dispatchEvent(event)}else{pom.click()}}
function DownloadPNG(){var canvas=document.getElementById("canvas");canvas.toBlob(function(blob){saveAs(blob,"pretty image.png")})};function cc(){if(confirm('вы уверены что хотите удалить?')){canvas.clear()}}
var onSolidCircle=function(){var Circle=new fabric.Circle({radius:30,fill:fillcolor,opacity:myopacity,stroke:strokecolor,strokeWidth:mystrokewidth,top:150,left:150});canvas.add(Circle);layerobj();canvas.off('mouse:down')}
var onSolidRect=function(){var rect=new fabric.Rect({top:100,left:100,width:60,height:70,selection:!1,opacity:myopacity,stroke:strokecolor,strokeWidth:mystrokewidth,fill:fillcolor,});canvas.add(rect);layerobj();canvas.off('mouse:down')}
var drawingColorEl=document.getElementById('stroke');var drawingLineWidthEl=document.getElementById('control_border');var onStartDrawing=function(){canvas.isDrawingMode=!canvas.isDrawingMode;canvas.freeDrawingBrush.color=drawingColorEl.value;canvas.freeDrawingBrush.width=parseInt(drawingLineWidthEl.value,10)||1;canvas.off('mouse:down')}
var onStopDrawing=function(){canvas.selection=!0;canvas.isDrawingMode=!1;canvas.off('mouse:down')}
var onZoomIn=function(){canvasScale=canvasScale*SCALE_FACTOR;canvas.setHeight(canvas.getHeight()*SCALE_FACTOR);canvas.setWidth(canvas.getWidth()*SCALE_FACTOR);var objects=canvas.getObjects();for(var i in objects){var scaleX=objects[i].scaleX;var scaleY=objects[i].scaleY;var left=objects[i].left;var top=objects[i].top;var tempScaleX=scaleX*SCALE_FACTOR;var tempScaleY=scaleY*SCALE_FACTOR;var tempLeft=left*SCALE_FACTOR;var tempTop=top*SCALE_FACTOR;objects[i].scaleX=tempScaleX;objects[i].scaleY=tempScaleY;objects[i].left=tempLeft;objects[i].top=tempTop;objects[i].setCoords()}
BackgroundZoomIn();canvas.renderAll()}
var onZoomOut=function(){canvasScale=canvasScale/SCALE_FACTOR;canvas.setHeight(canvas.getHeight()*(1/SCALE_FACTOR));canvas.setWidth(canvas.getWidth()*(1/SCALE_FACTOR));var objects=canvas.getObjects();for(var i in objects){var scaleX=objects[i].scaleX;var scaleY=objects[i].scaleY;var left=objects[i].left;var top=objects[i].top;var tempScaleX=scaleX*(1/SCALE_FACTOR);var tempScaleY=scaleY*(1/SCALE_FACTOR);var tempLeft=left*(1/SCALE_FACTOR);var tempTop=top*(1/SCALE_FACTOR);objects[i].scaleX=tempScaleX;objects[i].scaleY=tempScaleY;objects[i].left=tempLeft;objects[i].top=tempTop;objects[i].setCoords()}
BackgroundZoomOut()
canvas.renderAll()}
var onResetZoom=function(){canvas.setHeight(canvas.getHeight()*(1/canvasScale));canvas.setWidth(canvas.getWidth()*(1/canvasScale));var objects=canvas.getObjects();for(var i in objects){var scaleX=objects[i].scaleX;var scaleY=objects[i].scaleY;var left=objects[i].left;var top=objects[i].top;var tempScaleX=scaleX*(1/canvasScale);var tempScaleY=scaleY*(1/canvasScale);var tempLeft=left*(1/canvasScale);var tempTop=top*(1/canvasScale);objects[i].scaleX=tempScaleX;objects[i].scaleY=tempScaleY;objects[i].left=tempLeft;objects[i].top=tempTop;objects[i].setCoords()}
BackgroundZoomReset()
canvas.renderAll();canvasScale=1}
var run=!1;$('#create-polygon').click(function(){canvas.isDrawingMode=!1;canvas.selection=!1;poly()});canvas.on('mouse:dblclick',function(options){canvas.isDrawingMode=!1;canvas.selection=!1;poly()});function poly(){var min=99;var max=999999;var polygonMode=!1;var pointArray=new Array();var lineArray=new Array();var activeLine;var activeShape=!1;var map4x=new function(){canvas.on('mouse:down',function(options){if(options.target&&options.target.id==pointArray[0].id){map4x.polygon.generatePolygon(pointArray)}
if(polygonMode){map4x.polygon.addPoint(options)}});canvas.on('mouse:up',function(options){});canvas.on('mouse:move',function(options){if(activeLine&&activeLine.class=="line"){var pointer=canvas.getPointer(options.e);activeLine.set({x2:pointer.x,y2:pointer.y});var points=activeShape.get("points");points[pointArray.length]={x:pointer.x,y:pointer.y}
activeShape.set({points:points});canvas.renderAll()}
canvas.renderAll()})};$(document).on('keyup',function(evt){if(evt.keyCode==27){run=!run;if(run==!0)
{map4x.polygon.generatePolygon(pointArray);return}}});map4x.polygon={drawPolygon:function(){polygonMode=!0;pointArray=new Array();lineArray=new Array();activeLine},addPoint:function(options){var random=Math.floor(Math.random()*(max-min+1))+min;var id=new Date().getTime()+random;var circle=new fabric.Circle({radius:4,fill:'#ffffff',stroke:'#333333',strokeWidth:0.5,left:(options.e.layerX/canvas.getZoom()),top:(options.e.layerY/canvas.getZoom()),selectable:!1,hasBorders:!1,hasControls:!1,originX:'center',originY:'center',id:id});if(pointArray.length==0){circle.set({fill:'red'})}
var points=[(options.e.layerX/canvas.getZoom()),(options.e.layerY/canvas.getZoom()),(options.e.layerX/canvas.getZoom()),(options.e.layerY/canvas.getZoom())];line=new fabric.Line(points,{strokeWidth:2,fill:'#999999',stroke:'#999999',class:'line',originX:'center',originY:'center',selectable:!1,hasBorders:!1,hasControls:!1,evented:!1});if(activeShape){var pos=canvas.getPointer(options.e);var points=activeShape.get("points");points.push({x:pos.x,y:pos.y});var polygon=new fabric.Polygon(points,{stroke:'#333333',strokeWidth:1,fill:'#cccccc',opacity:0.1,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1});canvas.remove(activeShape);canvas.add(polygon);activeShape=polygon;canvas.renderAll()}
else{var polyPoint=[{x:(options.e.layerX/canvas.getZoom()),y:(options.e.layerY/canvas.getZoom())}];var polygon=new fabric.Polygon(polyPoint,{stroke:'#333333',strokeWidth:1,fill:'#cccccc',opacity:0.1,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1});activeShape=polygon;canvas.add(polygon)}
activeLine=line;pointArray.push(circle);lineArray.push(line);canvas.add(line);canvas.add(circle);canvas.selection=!1},generatePolygon:function(pointArray){var points=new Array();$.each(pointArray,function(index,point){points.push({x:point.left,y:point.top});canvas.remove(point)});$.each(lineArray,function(index,line){canvas.remove(line)});canvas.remove(activeShape).remove(activeLine);var polygon=new fabric.Polygon(points,{stroke:strokecolor,strokeWidth:mystrokewidth,fill:fillcolor,opacity:myopacity,hasBorders:!0,hasControls:!0,selectable:!0,perPixelTargetFind:!0,});canvas.add(polygon);activeLine=null;activeShape=null;polygonMode=!1;layerobj()}};map4x.polygon.drawPolygon();polygonMode=!0}
document.getElementById('bg_image').addEventListener('change',function(e){canvas.setBackgroundColor('',canvas.renderAll.bind(canvas));canvas.setBackgroundImage(0,canvas.renderAll.bind(canvas));var file=e.target.files[0];reader.onload=function(f){var data=f.target.result;fabric.Image.fromURL(data,function(img){imgWidth=img.width;imgHeight=img.height;aspectRatio=imgHeight/imgWidth;canvasWidth=canvasWrapperWidth;canvasHeight=canvasWrapperWidth*aspectRatio;var scaleFactor=canvasWidth/imgWidth;img.set({width:imgWidth,height:imgHeight,originX:'left',originY:'top',scaleX:scaleFactor,scaleY:scaleFactor});canvas.setWidth(canvasWidth);canvas.setHeight(canvasHeight);canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas))})};reader.readAsDataURL(file)});function BackgroundZoomIn()
{var cw=canvas.getWidth();var ch=canvas.getHeight();var iw=canvas.backgroundImage.width;var ih=canvas.backgroundImage.height;var isx=canvas.backgroundImage.scaleX;var isy=canvas.backgroundImage.scaleY;var sf=cw/iw;canvas.backgroundImage.scaleX=sf;canvas.backgroundImage.scaleY=sf}
function BackgroundZoomOut()
{var cw=canvas.getWidth();var ch=canvas.getHeight();var iw=canvas.backgroundImage.width;var ih=canvas.backgroundImage.height;var isx=canvas.backgroundImage.scaleX;var isy=canvas.backgroundImage.scaleY;var sf=cw*(1/iw);canvas.backgroundImage.scaleX=sf;canvas.backgroundImage.scaleY=sf}
function BackgroundZoomReset()
{var cw=canvas.getWidth();var ch=canvas.getHeight();var iw=canvas.backgroundImage.width;var ih=canvas.backgroundImage.height;var isx=canvas.backgroundImage.scaleX;var isy=canvas.backgroundImage.scaleY;var sf=cw/iw;canvas.backgroundImage.scaleX=sf;canvas.backgroundImage.scaleY=sf;console.log(cw);console.log(isx)}
var canvasDemo=(function(){var _config={canvasState:[],currentStateIndex:-1,undoStatus:!1,redoStatus:!1,undoFinishedStatus:1,redoFinishedStatus:1,undoButton:document.getElementById('undo'),redoButton:document.getElementById('redo'),};canvas.on('object:modified',function(){updateCanvasState()});canvas.on('object:added',function(){updateCanvasState()});var updateCanvasState=function(){if((_config.undoStatus==!1&&_config.redoStatus==!1)){var jsonData=canvas.toJSON();var canvasAsJson=JSON.stringify(jsonData);if(_config.currentStateIndex<_config.canvasState.length-1){var indexToBeInserted=_config.currentStateIndex+1;_config.canvasState[indexToBeInserted]=canvasAsJson;var numberOfElementsToRetain=indexToBeInserted+1;_config.canvasState=_config.canvasState.splice(0,numberOfElementsToRetain)}else{_config.canvasState.push(canvasAsJson)}
_config.currentStateIndex=_config.canvasState.length-1;if((_config.currentStateIndex==_config.canvasState.length-1)&&_config.currentStateIndex!=-1){_config.redoButton.disabled="disabled"}}}
var undo=function(){if(_config.undoFinishedStatus){if(_config.currentStateIndex==-1){_config.undoStatus=!1}
else{if(_config.canvasState.length>=1){_config.undoFinishedStatus=0;if(_config.currentStateIndex!=0){_config.undoStatus=!0;canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex-1],function(){var jsonData=JSON.parse(_config.canvasState[_config.currentStateIndex-1]);canvas.renderAll();_config.undoStatus=!1;_config.currentStateIndex-=1;_config.undoButton.removeAttribute("disabled");if(_config.currentStateIndex!==_config.canvasState.length-1){_config.redoButton.removeAttribute('disabled')}
_config.undoFinishedStatus=1})}
else if(_config.currentStateIndex==0){canvas.clear();_config.undoFinishedStatus=1;_config.undoButton.disabled="disabled";_config.redoButton.removeAttribute('disabled');_config.currentStateIndex-=1}}}}}
var redo=function(){if(_config.redoFinishedStatus){if((_config.currentStateIndex==_config.canvasState.length-1)&&_config.currentStateIndex!=-1){_config.redoButton.disabled="disabled"}else{if(_config.canvasState.length>_config.currentStateIndex&&_config.canvasState.length!=0){_config.redoFinishedStatus=0;_config.redoStatus=!0;canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex+1],function(){var jsonData=JSON.parse(_config.canvasState[_config.currentStateIndex+1]);canvas.renderAll();_config.redoStatus=!1;_config.currentStateIndex+=1;if(_config.currentStateIndex!=-1){_config.undoButton.removeAttribute('disabled')}
_config.redoFinishedStatus=1;if((_config.currentStateIndex==_config.canvasState.length-1)&&_config.currentStateIndex!=-1){_config.redoButton.disabled="disabled"}})}}}}
return{undoButton:_config.undoButton,redoButton:_config.redoButton,undo:undo,redo:redo,}})();canvasDemo.undoButton.addEventListener('click',function(){canvasDemo.undo()});canvasDemo.redoButton.addEventListener('click',function(){canvasDemo.redo()});function OpenasFunction(){document.getElementById("OpenasDropdown").classList.toggle("show")}
function SaveFunction(){document.getElementById("SaveDropdown").classList.toggle("show")}
function ControlFunction(){document.getElementById("ControlDropdown").classList.toggle("show")}
function GroupFunction(){document.getElementById("GroupDropdown").classList.toggle("show")}
function TextFunction(){document.getElementById("TextDropdown").classList.toggle("show")}
window.onclick=function(event){if(!event.target.matches('.dropbtnopn')){var dropdowns=document.getElementsByClassName("dropdown-content");var i;for(i=0;i<dropdowns.length;i++){var openDropdown=dropdowns[i];if(openDropdown.classList.contains('show')){}}}}
window.onclick=function(event){if(!event.target.matches('.dropbtn')){var dropdowns=document.getElementsByClassName("dropdown-content");var i;for(i=0;i<dropdowns.length;i++){var openDropdown=dropdowns[i];if(openDropdown.classList.contains('show')){}}}}
window.onclick=function(event){if(!event.target.matches('.dropbtnctrl')){var dropdowns=document.getElementsByClassName("dropdown-content");var i;for(i=0;i<dropdowns.length;i++){var openDropdown=dropdowns[i];if(openDropdown.classList.contains('show')){}}}}
window.onclick=function(event){if(!event.target.matches('.dropbtngrp')){var dropdowns=document.getElementsByClassName("dropdown-content");var i;for(i=0;i<dropdowns.length;i++){var openDropdown=dropdowns[i];if(openDropdown.classList.contains('show')){}}}}
window.onclick=function(event){if(!event.target.matches('.dropbtntxt')){var dropdowns=document.getElementsByClassName("dropdown-content");var i;for(i=0;i<dropdowns.length;i++){var openDropdown=dropdowns[i];if(openDropdown.classList.contains('show')){}}}}
$("#delete").click(function(){canvas.isDrawingMode=!1;deleteObjects()});function deleteObjects(){var activeObject=canvas.getActiveObjects();console.log(activeObject)
if(activeObject){activeObject.forEach(function(object){canvas.remove(object)});canvas.discardActiveObject()}
canvas.renderAll()}
document.onkeydown=function(e){switch(e.keyCode){case 38:if(canvas.getActiveObject()){canvas.getActiveObject().top-=5;canvas.renderAll()}
break;case 40:if(canvas.getActiveObject()){canvas.getActiveObject().top+=5;canvas.renderAll()}
break;case 37:if(canvas.getActiveObject()){canvas.getActiveObject().left-=5;canvas.renderAll()}
break;case 39:if(canvas.getActiveObject()){canvas.getActiveObject().left+=5;canvas.renderAll()}
break;case 46:if(canvas.getActiveObject()){deleteObjects()}
break;case 46:if(canvas.getActiveObject()){deleteObjects()}
break}}
$('#create-line').click(function(){canvas.isDrawingMode=!1;canvas.selection=!1;drawline()});function drawline(){var line;var isDrawing;canvas.on('mouse:down',function(o){isDrawing=!0;var pointer=canvas.getPointer(o.e);var points=[pointer.x,pointer.y,pointer.x,pointer.y];line=new fabric.Line(points,{opacity:myopacity,stroke:strokecolor,strokeWidth:mystrokewidth,});canvas.add(line)});canvas.on('mouse:move',function(o){if(isDrawing){var pointer=canvas.getPointer(o.e);line.set({x2:pointer.x,y2:pointer.y});canvas.renderAll()}});canvas.on('mouse:up',function(o){isDrawing=!1})}
$("#selall").on('click',function(){canvas.discardActiveObject();var sel=new fabric.ActiveSelection(canvas.getObjects(),{canvas:canvas,});canvas.setActiveObject(sel);canvas.requestRenderAll()});$("#group").on('click',function(){if(!canvas.getActiveObject()){return}
if(canvas.getActiveObject().type!=='activeSelection'){return}
canvas.getActiveObject().toGroup();canvas.requestRenderAll()});$("#ungroup").click(function(){if(!canvas.getActiveObject()){return}
if(canvas.getActiveObject().type!=='group'){return}
canvas.getActiveObject().toActiveSelection();canvas.requestRenderAll()});$("#des").on('click',function(){canvas.discardActiveObject();canvas.requestRenderAll()});$('a[href^="#"]').bind("click",function(e){var anchor=$(this);$('html, body').stop().animate({scrollTop:$(anchor.attr('href')).offset().top},750);e.preventDefault()});$(document).ready(function(){$('#simple-menu').sidr()});var appObject=function(){return{__canvas:canvas,__tmpgroup:{},addText:function(){var newID=(new Date()).getTime().toString().substr(5);var text=new fabric.IText($('#text-cont').val(),{fontFamily:'arial black',left:100,top:100,myid:newID,objecttype:'text'});this.__canvas.add(text);this.addLayer(newID,'text')},setTextParam:function(param,value){var obj=this.__canvas.getActiveObject();if(obj){if(param=='color'){obj.setColor(value)}else{obj.set(param,value)}
this.__canvas.renderAll()}},setTextValue:function(value){var obj=this.__canvas.getActiveObject();if(obj){obj.setText(value);this.__canvas.renderAll()}},addLayer:function(){}}}
$(document).ready(function(){var app=appObject();$('.font-change').change(function(event){app.setTextParam($(this).data('type'),$(this).find('option:selected').val())});$('#add').click(function(){app.addText()});$('#text-cont').keyup(function(){app.setTextValue($(this).val())})})
function deleteAnchor(){var str=document.location.toString();document.location=str.substring(0,str.lenght-str.indexOf('#'))}
let styleEl=document.createElement('style');document.body.appendChild(styleEl);var switcher=!1;$('#switcher').click(function(){switcher=switcher?!1:!0;switch(switcher){case!0:$('#switcher').text('Подсказки: Вкл');RemoveHelp();break;case!1:$('#switcher').text('Подсказки: Выкл');AddHelp();break}});function RemoveHelp(){styleEl.innerHTML=`
#undo:hover:after { all: unset; }
#redo:hover:after { all: unset; }
#openas:hover:after { all: unset; }
#saveas:hover:after { all: unset; }
#group:hover:after { all: unset; }
#control:hover:after { all: unset; }
#text:hover:after { all: unset; }
#input-polygon:hover:after { all: unset; }
#input-draw:hover:after { all: unset; }
#input-selection:hover:after { all: unset; }
#input-circle:hover:after { all: unset; }
#input-rect:hover:after { all: unset; }
#input-line:hover:after { all: unset; }
#input-layers:hover:after { all: unset; }
#input-copy:hover:after { all: unset; }
#input-paste:hover:after { all: unset; }
#input-zoomin:hover:after { all: unset; }
#input-zoomout:hover:after { all: unset; }
#input-zoomreset:hover:after { all: unset; }
`}
function AddHelp(){styleEl.innerHTML=`
#undo:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#redo:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#openas:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#saveas:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#group:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#control:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#text:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-polygon:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-draw:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-selection:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-circle:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-rect:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-line:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-layers:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-copy:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-paste:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-zoomin:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-zoomout:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
#input-zoomreset:hover:after {     content: attr(data-title);
    position: absolute;
    top: 40px;
    z-index: 1;
    background: rgba(145,199,247,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
	transition: background 0.2s ease;
	color: #323232; }
`}
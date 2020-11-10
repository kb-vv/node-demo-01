var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  //  console.log("method:");
  //  console.log(method);
  //  console.log("request.headers:");
  //  console.log(request.headers);

  
   if(path === '/'){
     response.statusCode = 200
     response.setHeader('Content-Type', 'text/html;charset=utf-8')
     response.write(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
    />
    <title>刘力为-简历</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <style id="style"></style>
    <div id="html"></div>
    <div id="div1wrapper">
      <div id="div1"></div>
    </div>

    <script src="main.js"></script>
  </body>
</html>
     `);
     response.end();
   } else if(path === '/style.css'){
     * {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
*::before {
  box-sizing: border-box;
}
#html {
  word-break: break-all;
}
#div1 {
  position: fixed;
  right: 20px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
#div1::before {
  content: "";
  display: block;

  position: absolute;
}
#div1::after {
  content: "";
  display: block;

  position: absolute;
}
@media (max-width: 500px) {
  #html {
    height: 50vh;
    overflow: auto;
  }
  #div1wrapper {
    height: 50vh;
  }
  #div1 {
    position: relative;
    top: 0;
    right: 0;
    left: 25%;
    transform: translateX(50%);
    transform: translateY(25%);
  }
}

     response.statusCode = 200
     response.setHeader('Content-Type', 'text/css;charset=utf-8')
     response.write(`body{color: red;}`)
     response.end()
   }
   else if(path === '/main.js'){
     let html=document.querySelector("#html");
let style=document.querySelector("#style");
let string=`/*你好，我叫kobe
*接下来我要演示一下我的前端功底
*首先我准备一个div
**/
#div1{
border:1px solid red;
width:200px;
height:200px;
}
/* 接下来我把div变成一个八卦图
*注意看好了
*首先，我把div变成一个圆
**/
#div1{
    border-radius:50%;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    border:none;
}
/*
*八卦是阴阳形成的
*一黑一白
**/
#div1{
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
}
/*加两个神秘的小球*/
#div1::before{
    width:100px;
    height:100px;
    left:0;
    top:0;
    left:50%;
    background:#000;
    transform:translateX(-50%);
    border-radius:50%;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);
}
#div1::after{
    width:100px;
    height:100px;
    left:0;
    bottom:0;
    left:50%;
    background:#fff;
    transform:translateX(-50%);
    border-radius:50%;
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%);
}
`;
let string2=``;
console.log(string.length)
let n=0;
let step = ()=>{   
    setTimeout(()=>{       
          if(string[n]==="\n"){
            string2+="<br>"
        }else if(string[n]===" "){
            string2+="&nbsp;";
        }else{
            string2+=string[n];
          }
          html.innerHTML=string2;
        style.innerHTML=string.substring(0,n);
        window.scrollTo(0,99999);
        html.scrollTo(0,99999);
        if(n<string.length-1){
            n+=1;   
            step();
        }else{
        }
    },100);
};
 step();
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(`console.log('这就是JS内容')`)
    response.end()
  }
 else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

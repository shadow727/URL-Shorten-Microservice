$(document).ready(function(){
  $("#inputButton").on("click",function(){
    var newText = $("#URLText").val();
    var detectRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    if (detectRegex.test(newText)){
      window.open("https://third-odometer.glitch.me/new/"+newText);
    }else{
      alert ("please input the URL as www.xxxxx.com");
    }
  });
  $("#URLText").keyup(function(keyboard){
    if (keyboard.keyCode == 13){
      $("#inputButton").click();
    }
  });
})
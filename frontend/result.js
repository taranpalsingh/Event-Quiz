$(document).ready(()=>{

  confetti.start();

  let params = (new URL(document.location)).searchParams;
  name = params.get("name");
  score = params.get("score");

  $(".name").html(name);
  $(".score").html("Score: "+score);
  $(".btn").click(()=>{
    window.location.href = "index.html";
  })

  setTimeout(()=>{
    window.location.href = "index.html";
  }, 10000);

});
/*
http://127.0.0.1:5500/frontend/result.html?name=Taran&score=5
*/
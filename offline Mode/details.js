$(document).ready(()=>{
  // startServer();
  $("#back").click(()=>{
    window.location.href = "index.html";
  })
  $('#submit').click(function() {

    let invalid = false;
    var $inputs = $('#myForm :input');
  
    var values = {};
    $inputs.each(function() {
        if($(this).val()===""){
          invalid = true;
          this.classList.add("reqd");
        }
        else{
          this.classList.remove("reqd");
        }
        values[this.name] = $(this).val();
    });

    if(!invalid){ 
      window.location.href = "quiz.html?name="+("Dr. "+values.name);

    }
  });
});


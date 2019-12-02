$(document).ready(()=>{
  startServer();
  // $("#submit").click(()=>{
  //   var radioValue = $("input[name='gender']:checked").val();
  //   console.log("submitting");
  //   console.log(radioValue);
    
  // })
  
  // $('#myForm').submit(function() {
  //   // get all the inputs into an array.
  //   var $inputs = $('#myForm :input');

  //   // not sure if you wanted this, but I thought I'd add it.
  //   // get an associative array of just the values.
  //   var values = {};
  //   $inputs.each(function() {
  //       values[this.name] = $(this).val();
  //   });
  //   postData(values);
    
  // });
  $("#back").click(()=>{
    window.location.href = "index.html";
  })
  $('#submit').click(function() {

    // e.preventDefault();
    let invalid = false;
    var $inputs = $('#myForm :input');
  
    var values = {};
    $inputs.each(function() {
        if($(this).val()===""){
          invalid = true;
          this.classList.add("reqd");
          // console.log(this);
        }
        else{
          this.classList.remove("reqd");
        }
        values[this.name] = $(this).val();
    });

    if(!invalid){ 

      console.log(values);
      postData(values);
    }
  });
});

// function getData(e){
//   e.preventDefault();
// }

function postData(data){
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://doctorsquiz.herokuapp.com/users",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify(data),
    success: (res)=>{
      // console.log(res);
      // window.location.href = "quiz.html?id="+res._id+"&name="+(res.salutation+" "+res.name);
      window.location.href = "quiz.html?id="+res._id+"&name="+("Dr. "+res.name);
    }
  })
}

function startServer(){
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://doctorsquiz.herokuapp.com/",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    },
    success: (res)=>{
      console.log(res);
    }
  })
}
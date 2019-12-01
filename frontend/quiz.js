let prevClicked = null;
let score = 0, id;
let questionNumber = 0;
let questionSelected, options, answer;
const qaBank = [
  {
      "question": "TAVR is an established treatment modality for:",
      "options":[
          "Severe Aortic valve stenosis",
          "Severe Coronary artery stenosis",
          "Repairing a thoracic aneurysm"
      ],
      "correct": 0
  },
  {
      "question": "Full form of TAVR is:",
      "options":[
          "Transcaval Aortic Vascular Repair",
          "Transcatheter Aortic Valve Replacement",
          "Transfemoral Artery Vascular Repair"
      ],
      "correct": 1
  },
  {
      "question": "Benefits of TAVR:",
      "options":[
          "Non-Surgical",
          "Faster Recovery",
          "No Chest Scars",
          "Faster discharge",
          "All of above",
          "None of the above"
      ],
      "correct": 4
  },
  {
      "question": "Diagnostic tests for Severe Aortic stenosis include:",
      "options":[
          "ECHO",
          "ECG",
          "CT Scan",
          "MRI", 
          "Options 1,2,3", 
          "Options 2,3,4",
          "All of above",
          "None of the above"
      ],
      "correct": 4
  },
  {
      "question": "Brand name of First Indian TAVR Device:",
      "options":[
          "Myvalve",
          "Myval",
          "Meres",
          "Biomime"
      ],
      "correct": 1
  }
];

function restartQuestion(){
  
  console.log(questionNumber)
  if(questionNumber==5){
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/users/"+id+"/"+score,
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      // "data": JSON.stringify(data),
      success: (res)=>{
        
        alert("Your score is: "+score);
        window.location.href = "details.html"
        // console.log(res);
      }
    })
  }

  prevClicked = null;

  if(questionNumber < 5){

    questionSelected = qaBank[questionNumber];
    options = questionSelected.options;
    answer = questionSelected.options[questionSelected.correct];
    console.log(answer);
  
    $(".question").html(questionSelected.question);
    createOptions(options);

    $(".questionNumberDisplay").html("Question: "+(questionNumber+1));

  }  
}

$(document).ready(()=>{

  let params = (new URL(document.location)).searchParams;
  let name = params.get("name");
  id = params.get("id");
  console.log(id + " , "+ name);
  $(".playersName").html(name);
  
  restartQuestion();
  
  $("#quit").click(()=>{
    window.location.href = "details.html"
  });

  $("#submit").click(()=>{
    // console.log(prevClicked);
    if(prevClicked == null){
      console.log("Please choose one"); 
      alert("Please choose one"); 
    }
    else{
      if(prevClicked === answer){
        console.log("correct");
        score++;
        questionNumber++;
        restartQuestion();
      
        console.log("score: ",score);
        
      }
      else{
        questionNumber++;
        restartQuestion();
        console.log("score: ",score);
      }
    }
  })
});


function optionSelected(id){
  
  let classes = document.getElementById(id).classList.value.split(" ");

  if(classes.includes("unselected")){
    document.getElementById(id).classList.remove("unselected");
    document.getElementById(id).classList.add("selected");    
  }

  if(prevClicked != null && prevClicked != id){
    document.getElementById(prevClicked).classList.remove("selected");
    document.getElementById(prevClicked).classList.add("unselected");    
  }
  prevClicked = id;
}


function createOptions(options){

  let wrapper = document.getElementById("optionsWrapper");
  wrapper.innerHTML = "";
  
  options.forEach(element => {
    
    let col = document.createElement('div');
    col.setAttribute("id", element)
    col.classList.add("col-md-8", "offset-md-2", "option", "text-center", "unselected");
    col.setAttribute('onclick', "optionSelected(this.id)");
    col.textContent = element;

    wrapper.appendChild(col);
  });
}

let prevClicked = null;
let score = 0, id, name;
let questionNumber = 0;
let questionSelected, options, answer;
let qaBank = [
  [
      {
          "question": "TAVR is an established treatment modality for:",
          "options":[
              "1. Severe Aortic valve stenosis",
              "2. Severe Coronary artery stenosis",
              "3. Repairing a thoracic aneurysm"
          ],
          "correct": 0
      },
      {
          "question": "Full form of TAVR is:",
          "options":[
              "1. Transcaval Aortic Vascular Repair",
              "2. Transcatheter Aortic Valve Replacement",
              "3. Transfemoral Artery Vascular Repair"
          ],
          "correct": 1
      },
      {
          "question": "Benefits of TAVR:",
          "options":[
              "1. Non-Surgical",
              "2. Faster Recovery",
              "3. No Chest Scars",
              "4. Faster discharge",
              "5. All of above",
              "6. None of the above"
          ],
          "correct": 4
      },
      {
          "question": "Diagnostic tests for Severe Aortic stenosis include:",
          "options":[
              "1. ECHO",
              "2. ECG",
              "3. CT Scan",
              "4. MRI", 
              "5. Options 1,2,3", 
              "6. Options 2,3,4",
              "7. All of above",
              "8. None of the above"
          ],
          "correct": 4
      },
      {
          "question": "Brand name of First Indian TAVR Device:",
          "options":[
              "1. Myvalve",
              "2. Myval",
              "3. Meres",
              "4. Biomime"
          ],
          "correct": 1
      }

  ],
  [
      {
          "question": "Meril is the First Indian company in the world to launch a Non-Surgical Aortic valve replacement therapy:",
          "options":[
              "1. Yes",
              "2. No"
          ],
          "correct": 0
      },
      {
          "question": "Meril’s Myval THV is CE Approved and launched in Europe, true or false?:",
          "options":[
              "1. True",
              "2. False"
          ],
          "correct": 0
      },
      {
          "question": "Latest clinical data suggests, TAVR is now a preferred therapy for following patients with Severe Aortic Valve Stenosis who also are:",
          "options":[
              "1. High risk to Surgery",
              "2. Intermediate risk to Surgery",
              "3. Low risk to Surgery",
              "4. All of above",
              "5. None of above"
          ],
          "correct": 3
      },
      {
          "question": "USP Tag line of Myval is:",
          "options":[
              "1. Preference for heart",
              "2. Precision at heart",
              "3. Live your life",
              "4. Future is here"
          ],
          "correct": 1
      },
      {
          "question": "Most of the patients get discharged on 3rd day after TAVR procedure, true or false?",
          "options":[
              "1. True",
              "2. False"
          ],
          "correct": 0
      }

  ]
];

function restartQuestion(){
  
  // console.log("questionNumber: "+questionNumber);
  
  if(questionNumber >= 4){
    $(".submit-btn").html("Submit");
  }
  else
    $(".submit-btn").html("Next");
  $(".submit-btn").css("background-color","#bc82d3");   
  // console.log(questionNumber)
  if(questionNumber==5){
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "https://doctorsquiz.herokuapp.com/users/"+id+"/"+score,
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      // "data": JSON.stringify(data),
      success: (res)=>{
        
        // alert("Your score is: "+score);
        window.location.href = "result.html?name="+name+"&score="+score;
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

  if(Math.random()>0.5)
    qaBank = qaBank[0];
  else
    qaBank = qaBank[1];

  console.log(qaBank[0].question)
  let params = (new URL(document.location)).searchParams;
  name = params.get("name");
  id = params.get("id");
  console.log(id + " , "+ name);
  $(".playersName").html(name);
  
  restartQuestion();
  
  $("#quit").click(()=>{
    window.location.href = "index.html"
  });

  $("#submit").click(()=>{
    // console.log(prevClicked);
    if(prevClicked == null){
      console.log("Please choose one"); 
      alert("Please choose one"); 
    }
    else{
      if(prevClicked === answer){
        score++;
        questionNumber++;
        restartQuestion();      
      }
      else{
        questionNumber++;
        restartQuestion();
      }
      console.log("score: ",score);

    }
  })
});


function optionSelected(id){
  
  let classes = document.getElementById(id).classList.value.split(" ");

  if(classes.includes("unselected")){
    document.getElementById(id).classList.remove("unselected");
    document.getElementById(id).classList.add("selected"); 
    $(".submit-btn").css("background-color","#8f248d");   
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

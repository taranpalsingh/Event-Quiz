let prevClicked = null;
let score = 0;
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
  
  prevClicked = null;

  questionSelected = qaBank[questionNumber];
  options = questionSelected.options;
  answer = questionSelected.options[questionSelected.correct];
  console.log(answer);

  $(".question").html(questionSelected.question);
  createOptions(options);
}

$(document).ready(()=>{

  restartQuestion();
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
        alert("No")
        questionNumber++;
        restartQuestion();
        console.log("score: ",score);
      }// console.log(prevClicked + " selected")
    }
  })
});


// function addDisease(disease){
//   let btn = document.createElement('button');
//   if(disease == predictedDisease)
//     btn.classList.add('btn', 'btn-success', 'btn-selected', 'btnDisease', 'mx-2', 'my-2')
//   else
//     btn.classList.add('btn', 'btn-unselected', 'btnDisease', 'mx-2', 'my-2');
//   btn.textContent = disease;
//   btn.setAttribute('id', disease);
//   btn.setAttribute('onclick', "diseaseOnClick(this.id)");

//   let btnWrap = document.getElementById('buttonWrapper');
//   btnWrap.appendChild(btn);
// }


function optionSelected(id){
  
  let classes = document.getElementById(id).classList.value.split(" ");

  if(classes.includes("unselected")){
    // console.log("unselected");
    
    document.getElementById(id).classList.remove("unselected");
    document.getElementById(id).classList.add("selected");    
  }
  // else if(classes.includes("selected")){
    // console.log("selected");
    // document.getElementById(id).classList.remove("btn-success", "btn-selected");
    // document.getElementById(id).classList.remove("selected");
    // document.getElementById(id).classList.add("unselected");    
  // }

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

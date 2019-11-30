function createOptions(options){

    let wrapper = document.getElementById("optionsWrapper");
  
    console.log(wrapper);
    
    options.forEach(element => {
      
      let col = document.createElement('div');
      col.classList.add("col-md-8", "offset-md-2", "option");
      // btn.setAttribute('onclick', "diseaseOnClick(this.id)");
  
  
      let row = document.createElement('div');
      row.classList.add("row");
  
      let innerColRadio = document.createElement('div');
      innerColRadio.classList.add("col-2");
  
      let input = document.createElement('input');
      input.classList.add("form-control");
      input.setAttribute("type", "radio");
      input.setAttribute("name", "choices");
  
      let innerColText = document.createElement('div');
      innerColText.classList.add("col-10");
      innerColText.textContent = element;
  
      innerColRadio.appendChild(input);
      row.appendChild(innerColRadio);
      row.appendChild(innerColText);
      col.appendChild(row);
      wrapper.appendChild(col);
    });
  }
 
    input = document.getElementById("myInput");
    //  document.getElementById("addBtn").onclick = addNewItem;
     input.addEventListener("keypress", addItemKeyPress);
     
     // Add new items
     function addNewItem() {
 
       //  5 below lines are all the same:
       getElement = input.value;
       // const getElement = document.querySelector("input").value;
       //  const newElement = document.getElementsByTagName("input")[0].value;
       //  const newElement = document.getElementById("myInput").value;
       //  const newElement = document.querySelectorAll("input")[0].value;
       
       if (getElement == "") {
        
          document.querySelector("input").placeholder = "Please Enter Something To Do ...";
       } else {
          let table = document.getElementById("mainTable");
          let row1 = document.createElement("tr");
          let col1 = document.createElement("td");
          let col2 = document.createElement("td");
          let delbtn = document.createElement("button");      
          let newCheckBox = document.createElement("input");
          newCheckBox.type = "checkbox";
          newCheckBox.name = "tasks";
          let txtnode = document.createTextNode(" \t " + getElement);
 
          // Style elements      
          delbtn.className = "delbutton";
          col1.className = "td1";
          col2.className = "td2";
          newCheckBox.className = "chkbox";
 
          // Append elements
          table.appendChild(row1);
          row1.appendChild(col1);
          row1.appendChild(col2);
          delbtn.appendChild(document.createTextNode("X"));
          col1.appendChild(newCheckBox);
          col1.appendChild(txtnode);
          col2.appendChild(delbtn);
         
          // Restore to default settings
          document.querySelector("input").value = "";
          document.querySelector("input").placeholder = "New Task...";
          
           //Delete Item
          delbtn.addEventListener("click", deleteItem);
          function deleteItem() {
             row1.classList.add("delete");
          }
          
          // Cross out Item
          col1.addEventListener("click", crossOut);
          function crossOut() {
             row1.classList.toggle("crossout");           
          }
       }
    } //End of addNewItem()
 
    function addItemKeyPress(event) {
       if (event.which ===13) {
          //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
                addNewItem();
       } 
    } 
 
 
         
     
  
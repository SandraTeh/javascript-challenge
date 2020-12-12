//****looping through the data and convert into html table*****

// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// Console.log the data from data.js
console.log(tableData);

// // UFO report values
// // // Step 1: Loop Through `data` and console.log each UFO report object
data.forEach((ufoReport) => {
// // // Step 2:  Use d3 to append one table row `tr` for each UFO report object
    var row = tbody.append("tr");
// // // Step 3:  Use `Object.entries` to console.log each UFO report value
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td"); // // // Step 4: Use d3 to append 1 cell per UFO report value
      cell.text(value); // // Step 5: Use d3 to update each cell's text with
    });
  });

// create a update the table function
function update_table(data){
  // Update the table
     tbody.selectAll('tr').remove();
     var rows = tbody.selectAll('tr')
              .data(data)
              .enter()
              .append('tr');
  // create a cell in each row for each column
  data.forEach((ufoReport) => {
      // // // Step 2:  Use d3 to append one table row `tr` for each UFO report object
          var row = tbody.append("tr");
      // // // Step 3:  Use `Object.entries` to console.log each UFO report value
          Object.entries(ufoReport).forEach(([key, value]) => {
            var cell = row.append("td"); // // // Step 4: Use d3 to append 1 cell per UFO report value
            cell.text(value); // // Step 5: Use d3 to update each cell's text with
          });
        });
  }  


// // ******Filter Multiple Seach*****
// Select the button
var button = d3.select("#filter-btn");

// Select the form

var form = d3.select(".form-control");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit", runEnter);

// Create the function to run for both events
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

   // Select the input element and get the raw HTML node
   var inputElement1 = d3.select("#datetime");
   var inputElement2 = d3.select("#city");
   var inputElement3 = d3.select("#state");
   var inputElement4 = d3.select("#country");
   var inputElement5 = d3.select("#shape");
 
   // Get the value property of the input element
   var inputValue1 = inputElement1.property("value");
   var inputValue2 = inputElement2.property("value");
   var inputValue3 = inputElement3.property("value");
   var inputValue4 = inputElement4.property("value");
   var inputValue5 = inputElement5.property("value");
   
   console.log(inputValue1);
   console.log(inputValue2);
   console.log(inputValue3);
   console.log(inputValue4);
   console.log(inputValue5);
   console.log(tableData);
   
   //Get the filter value in object
   var filterobject = {
    datetime: inputValue1 ,
    city: inputValue2,
    state: inputValue3,
    country: inputValue4,
    shape: inputValue5,
  }

  //Remove null attribute from the filter object
   function clean(obj) {
     for (var propName in obj) { 
       if (obj[propName] === "" || obj[propName] === undefined) {
         delete obj[propName];
       }
     }
   }
  
  clean(filterobject);

  filter = clean(filterobject);
  console.log(filterobject);

  //do a loop to filter the data
  filtereddata = tableData.filter(function(item) {
    for (var key in filterobject) {
      if (item[key] === undefined || item[key] != filterobject[key])
        return false;
    }
    return true;
  });
  
  console.log(filtereddata);
   update_table(filtereddata); 
 
 };


//Reset Seach
var reset_btn = d3.select("#reset-btn");
reset_btn.on("click", function() {
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('country').value = '';
    document.getElementById('shape').value = '';
    update_table(tableData);
});  

//do an autocomplete for city name

var cityname = tableData.map( (value) => value.city).filter( (value, index, _tableData) => _tableData.indexOf(value) == index);
console.log(cityname);

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}


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
// ******Filter Single Seach*****
// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select(".form-control");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit",runEnter);

// Create the function to run for both events
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);
  console.log(tableData);

  var filteredData = tableData.filter(date => date.datetime === inputValue);

  console.log(filteredData);

    update_table(filteredData);

};

//Reset Seach
var reset_btn = d3.select("#reset-btn");
reset_btn.on("click", function() {
  update_table(tableData);
});  
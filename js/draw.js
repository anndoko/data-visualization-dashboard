var data = [];
var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
  "MARRIED": "#5D7EE6",
  "OWN CHILDREN IN HOUSEHOLD": "#DFD041",
  "HAS HEALTHCARE COVERAGE": "#39CEF4",
  "BACHELOR'S DEGREE OR MORE": "#F97F33",
  "EMPLOYED": "#D441A2",
  "SELF-EMPLOYED*": "#C27F25",
  "PRIMARILY PUB. TRANS. TO WORK*": "#E04364",
  "PERSONAL INCOME ABOVE NAT. MED.": "#5EB731",
  "BELOW POVERTY LINE": "#555555",
  "VETERAN": "#B092CE",
  "BORN OUTSIDE US": "#BCC641",
  "COG. OR PHYS. DIFFICULTY": "#EC7C9C",
  "HEARING OR VIS. DIFFICULTY": "#F09AB3",
  "WIDOWED": "#23D8A0"
}

var column_names = {
  "MARRIED": "married",
  "OWN CHILDREN IN HOUSEHOLD": "children",
  "HAS HEALTHCARE COVERAGE": "healthcare",
  "BACHELOR'S DEGREE OR MORE": "college",
  "EMPLOYED": "employed",
  "SELF-EMPLOYED*": "selfemp",
  "PRIMARILY PUB. TRANS. TO WORK*": "publictrans",
  "PERSONAL INCOME ABOVE NAT. MED.": "income_moremed",
  "BELOW POVERTY LINE": "inpoverty",
  "VETERAN": "isveteran",
  "BORN OUTSIDE US": "bornoutus",
  "COG. OR PHYS. DIFFICULTY": "diffmovecog",
  "HEARING OR VIS. DIFFICULTY": "diffhearvis",
  "WIDOWED": "widowed"
}

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file
function loadData() {
    // load the demographics.csv file
    d3.csv("data/demographics.csv", function (d){
      data = d;
      // assign it to the data variable, and call the visualize function by first filtering the data
      var dataitem = findDataItem();
      // call the visualization function by first findingDataItem
      visualizeSquareChart(dataitem);
    });
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
    // you will find the SINGLE item in "data" array that corresponds to
    //the USER_SEX (sex), USER_RACESIMP (racesimp), and USER_AGEGRP(agegrp) variable values

    //HINT: uncomment and COMPLETE the below lines of code
    var item = data.filter(function (d) {
      //WHAT GOES HERE
      if(d.sex == USER_SEX && d.racesimp == USER_RACESIMP && d.agegrp == USER_AGEGRP){
        return d;
      }
    });
    if (item.length == 1) {
       return item[0];
    }
    return null;
}

//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(dataitem) {
    // visualize the square plot per attribute in the category_color variable
    // code for Q16 goes here

    //HINT: you will iterate through the category_colors variable and draw a square chart for each item
    var fields = d3.keys(category_colors)
    var colors = d3.values(category_colors)
    var columns = d3.values(column_names)

    fields.forEach(function (v, i){
        var column = columns[i]
        var value = dataitem[column]
        // Draw the div wrapper
        var div = d3.select("#chart1")
          .append("div")
          .attr("id", "holder" + v)
          .attr("class", "chartholder")
          .attr("style","float: left; margin: 24px 24px 16px;");

        // Print the category name
        div.append("h6").html(v)
        .attr("style", "width: 128px; height: 16px; text-align: left; line-height: 16px");

        // Draw the svg (empty)
        var svg = div.append("svg")
          .attr("display", "inline-block")
          .attr("width", 132)
          .attr("height", 152)
          .append("g");

        var rectWidth = 12.3;

        var cell = svg.selectAll(".cell")
        .enter()
        .attr("class", "cell");

        cell.append("rect")
        .data(d3.range(100))
        .enter()
        .append("rect")
        .attr("width", rectWidth)
        .attr("height", rectWidth)
        .attr("fill", function(d){
            if ((d + 1) > (100 - value)){
              return colors[i];
            }
            else {
              return "#E0E0E0";
            }
        })
        .attr("x", function(d, i) {return i%10*rectWidth})
        .attr("y", function(d, i) {
          if (i < 9){
            return 0;
          }
          else {
            return (Math.floor(i/10))*rectWidth;
          }
        })
        .attr("stroke", "white");
    });

    // Update the count div whose id is "n" with item.total
    d3.select("#n").text(dataitem.total);
}


//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value.
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // find the data item and invoke the visualization function
        visualizeSquareChart(findDataItem());
    });
    // RACE
    d3.selectAll("#racesimp .button").on("click", function () {
        USER_RACESIMP = d3.select(this).attr("data-val");
        d3.select("#racesimp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // find the data item and invoke the visualization function
        visualizeSquareChart(findDataItem());
    });

    //AGEGROUP
    d3.selectAll("#agegrp .button").on("click", function () {
        USER_AGEGRP = d3.select(this).attr("data-val");
        d3.select("#agegrp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // find the data item and invoke the visualization function
        visualizeSquareChart(findDataItem());
    });

}

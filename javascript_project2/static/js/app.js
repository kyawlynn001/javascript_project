// from data.js
var tableData = data;

// YOUR CODE HERE!

// get all attributes tbody
//that I target
var tbody = d3.select("tbody");


function buildTable(data){
    //first clear out any existing data
    tbody.html("");

    //next loop through each object in the data
    //append a row and cell for each value in the row

    data.forEach(function(dataRow){
        var row = tbody.append("tr");

        // loop through each field in the dataRow and add
        //each values as a table cell

        Object.values(dataRow).forEach(function(val){
            var cell = row.append("td");
            cell.text(val);
        })

    })
    
    

}

//keep track of all filters
var filters = {};

function filterTable(){
    let filteredData = tableData;

    //loop through all of the filters and keep any data that matches the filter value
    Object.entries(filters).forEach(function([key,value]){
        filteredData = filteredData.filter((row) => row[key]=== value);
    })

    buildTable(filteredData);
    
}

function updateFilters(){
    //save the elements, value and id of the filter that was changed
    var changeElement = d3.select(this).select("input");
    var elementValue = changeElement.property("value");
    var filterId = changeElement.attr("id");

    //if a filter value was entered then add that filterID and value
    //to the filter list

    if(elementValue){
        filters[filterId] = elementValue;

    }
    else {
        delete filters[filterId];

    }
    // Call function to ally all filters and rebuild table
    filterTable()
}


//Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);



//Build the table when the page loads
buildTable(tableData);




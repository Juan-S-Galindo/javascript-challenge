// Getst the table from the data.js
var ufoData = data;

// Variables
var resetButton = d3.select("#reset-btn");
var dateInput = d3.select("#datetime");
var citySelector = d3.select("#inputCity");
var stateSelector = d3.select("#inputState");
var countrySelector = d3.select("#inputCountry");
var shapeSelector = d3.select("#inputShape");
var submmitTable = d3.select("#filter-btn");

// Declares a list as a constant for each city, state, country and shape to use in th filter dropdown options.
var cityList = [...new Set(ufoData.map(row => row.city))].sort();
var stateList = [...new Set(ufoData.map(row => row.state))].sort();
var countryList = [...new Set(ufoData.map(row => row.country))].sort();
var shapeList = [...new Set(ufoData.map(row => row.shape))].sort();


// function to build the table
function getThatTable(dataTable) {

    // Clears the body of the table.
    d3.select("tbody").selectAll("tr").remove();

    //for each loop to build the table.
    dataTable.forEach((row) => {

        // variable to build the entrie. Starts by selecting tbody and appending tr.
        var tableRowData = d3.select("tbody").append("tr");

        //Creates an object and  for each of the values in row, appendnd a td with the txt of that row.
        Object.values(row).forEach(value => tableRowData.append("td").text(`${value}`));
    });
};

// function to  filter the data.
function filterMyTable(row) {

    //Filters
    //Date Input. 
    var filterOuput = (new Date(row.datetime)).getTime() >= (new Date(dateInput.property("value"))).getTime();

    // City
    if (citySelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.city === citySelector.property("value")));
    };

    // State
    if (stateSelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.state === stateSelector.property("value")));
    };

    // Country
    if (countrySelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.country === countrySelector.property("value")));
    };

    // Shape
    if (shapeSelector.property("value") != "Select Parameter") {
        filterOuput = (filterOuput && (row.shape === shapeSelector.property("value")));
    };

    return filterOuput;
};

// Action handler.
submmitTable.on("click", function() {

    // Prevents refreshin
    d3.event.preventDefault();

    // Applies a filter to the data.
    var filteredTable = ufoData.filter(filterMyTable);

    // passes the filetered data into the table builder.
    getThatTable(filteredTable);

    //document.querySelectorAll("#inputCity").forEach(city => city.remove);

    //trying to filter the dropdown menu options after filtering data the frist time. dont have time to finish for now.
    //var cityList = [...new Set(filteredTable.map(row => row.city))].sort();
    // var stateList = [...new Set(filteredTable.map(row => row.state))].sort();
    // var countryList = [...new Set(filteredTable.map(row => row.country))].sort();
    // var shapeList = [...new Set(filteredTable.map(row => row.shape))].sort();

    // dropDownComponents();
    //---------------------------------------------------------------------
});

// Resert bytton handler.
resetButton.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Resets input text.
    dateInput.property("value", "1/1/2010");
    
    // Reset to default params the boxes
    var htmlElements = document.getElementsByTagName('select');
    for (var i = 0; i < htmlElements.length; i++) {
        htmlElements[i].selectedIndex = 0;

    //constructor 
    initComponents();
    };
});

//function to populate the drop down menus.
function dropDownComponents(){

    // loads the city into the city box
    cityList.forEach((city) => {
        
        citySelector.append("option").text(`${city}`);
    });

    //  loads the state into the state box
    stateList.forEach((state) => {
        stateSelector.append("option").text(`${state}`);
    });

    //  loads the state into the state box
    countryList.forEach((country) => {
        countrySelector.append("option").text(`${country}`);
    });

    //  loads the state into the state box
    shapeList.forEach((shape) => {
        shapeSelector.append("option").text(`${shape}`);
    });
};


// function to load the components the first time.
function initComponents() {

    //calls the drop down menu option
    dropDownComponents();

    // builds the initial table.
    getThatTable(ufoData);
};

//Constructor
initComponents();
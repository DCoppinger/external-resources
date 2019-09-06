const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/");
    xhr.send();



    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

// function printDataToConsole(data){
//     console.log(data);
// }

// getData(printDataToConsole);

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        // console.dir(data);
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                dataRow.push(`<td>${item[key]}</td>`);
                // console.log(key);
            });
            //el.innerHTML += "<p>" + item.name + "</p>";
            tableRows.push(dataRow);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}

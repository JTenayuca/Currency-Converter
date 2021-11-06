let API_KEY = "<fixer.io api key>"; //obtain for free on fixer.io

let url = "http://data.fixer.io/api/latest?access_key=";

function getLatest() {
    fetch(url + API_KEY)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
        let JSONRates = myJson.rates;
  
        Object.entries(JSONRates).forEach(([key, value]) => {
          // if (key === FromValue) {
          // console.log(value)
          //}
          // console.log(`key= ${key} value = ${value}`)
          let ptag = document.createElement("p");
          let newline = document.createTextNode(`${key} : ${value}`);
          ptag.appendChild(newline);
          let divtag = document.getElementById("ratesdiv");
          divtag.appendChild(ptag);
          console.log(`${key} : ${value}`);
        });
  
        //document.getElementById("ConvertedValue").innerHTML = base;
      });
  }

  document.getElementById("LatestValues").addEventListener("click", getLatest, false);
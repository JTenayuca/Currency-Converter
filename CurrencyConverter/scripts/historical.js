let API_KEY = "bdb73d9ed01a4941b20a557206a6c2d3";

let url = "http://data.fixer.io/api/";

function gethistoricalvalue() {
  //get base and target currency from form
  let dateControl = document.querySelector('input[id="start"]');
  let FromCurrency = document.getElementById("currencyFromInput").value;
  let ToCurrency = document.getElementById("currencyToInput").value;
  let Amount = document.getElementById("AmountConvert").value;




  //use fetch method to call API with key and get JSON data
  fetch(url + dateControl.value + "?" +"access_key=" + API_KEY)
  .then(function(response) {

  return response.json();
  })
  .then(function(myJson) {

  console.log(JSON.stringify(myJson));

    //put 'rates' part of the JSON into a variable
    let JSONRates = myJson.rates;
    let JSONSuccess = myJson.success;
    console.log(JSONSuccess);

    /*
    The base tier of the API does not support conversion. All exchange rates are posted using the Euro as the base currency.
    Therefore, get the desired base currency and target currency exchange rates in Euros and then perform a cross currency calculation.
    First iterate through the 'rates' part of the object and capture the base currency value in a variable:
    */


    if (JSONSuccess === true) {
    Object.entries(JSONRates).forEach(([key, value]) => {
    if (key === FromCurrency) {
      FromCurrencyRate = value;
      console.log(value);
      console.log("FromCurrencyRate is equal to: " + FromCurrencyRate);
    }

    });

    //Iterate again through the rates keys again to find the target currency and store its value:
    Object.entries(JSONRates).forEach(([key, value]) => {
    if (key === ToCurrency) {
    ToCurrencyRate = value;
    console.log(value);
    console.log("ToCurrencyRate is equal to: " + ToCurrencyRate);
    }

    });

    console.log("The exchange rate of " + FromCurrency + " to " + ToCurrency + " is: " + ToCurrencyRate/FromCurrencyRate);
    //once both values are found perform the cross currency calculation and multiply
    //it by the user specified amount.
    let RateValue = (ToCurrencyRate/FromCurrencyRate) * Amount;
    //round the RateValue to two decimal places
    let RoundedValue = Math.round(RateValue * 100)/100
    //place the value into the html:
    document.getElementById("ConvertedValue").innerHTML = Amount + " " + FromCurrency + " " + "=" + RoundedValue + " " + ToCurrency;
}
else {
  document.getElementById("ConvertedValue").innerHTML = "Please enter a valid date!";
}
    });
  }


document.getElementById('latest').addEventListener("click", gethistoricalvalue, false);

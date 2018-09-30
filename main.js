// --------- Service Worker Registration

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .then(function(reg) {
      // registration worked
      console.log("Registration succeeded. Scope is " + reg.scope);
    })
    .catch(function(error) {
      // registration failed
      console.log("Registration failed with " + error);
    });
}

// ---------- get all countries

fetch("https://free.currencyconverterapi.com/api/v5/countries")
  .then(response => response.json())
  .then(response => {});
  
// ---------- get all currencies

fetch("https://free.currencyconverterapi.com/api/v5/currencies")
  .then(response => response.json())
  .then(response => {
    const originSelect = document.getElementById("origin-currency-sel");
    const destenySelect = document.getElementById("desteny-currency-sel");
    const allCourency = Object.entries(response.results);
    allCourency.map(item => {
      var option = document.createElement("option");
      if (item[1].currencySymbol)
        option.text = `${item[1].currencyName} ${item[1].currencySymbol}`;
      else option.text = `${item[1].currencyName}`;
      option.value = item[1].id;
      originSelect.appendChild(option);
    });
    allCourency.map(item => {
      var option = document.createElement("option");
      if (item[1].currencySymbol)
        option.text = `${item[1].currencyName} ${item[1].currencySymbol}`;
      else option.text = `${item[1].currencyName}`;
      option.value = item[1].id;
      destenySelect.appendChild(option);
    });
  });
  
const btnConvert = document.getElementById("btn-convert");
btnConvert.addEventListener("click", () => {
  const source = document.getElementById("origin-currency-sel");
  const sourceVal = source.options[source.selectedIndex].value;
  const target = document.getElementById("desteny-currency-sel");
  const targetVal = target.options[target.selectedIndex].value;
  // ---------- get  compact currency
  fetch(
    `https://free.currencyconverterapi.com/api/v5/convert?q=${sourceVal}_${targetVal}&compact=y`
  )
    .then(response => response.json())
    .then(response => {
      const quantity = document.getElementById("quantity");
      const tax = Object.entries(response);
      let result = 0;
      tax.map(item => {
        result = Number(quantity.value) * item[1].val;
      });
      document.getElementById("result").innerHTML = result;
    });
});

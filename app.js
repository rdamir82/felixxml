// GET INPUT DATA

const inputFileField = document.getElementById('inputFile')
const reader = new FileReader();
let xmlFileStringContent = ""

inputFileField.addEventListener('change', () => {
  const file = inputFileField.files[0];

  if (file) {
    reader.addEventListener('load', () => {
      console.log("reader done");
    });
    reader.readAsText(file);
  }
})

reader.addEventListener('load', function(){
  console.log("READER EVEN LISTENER")
  console.log(reader.result)
  xmlFileStringContent = reader.result
  console.log("xmlFileStringContent:")
  console.log(xmlFileStringContent)
  let xmlDoc = new DOMParser().parseFromString(xmlFileStringContent, "text/xml");
  let json = xmlToJson(xmlDoc)
  console.log(json)
  incommingData = json
  renderData(incommingData)

})


function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    // if (xml.attributes.length > 0) {
    //   obj["@attributes"] = {};
    //   for (var j = 0; j < xml.attributes.length; j++) {
    //     var attribute = xml.attributes.item(j);
    //     obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
    //   }
    // }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName.includes(":") ? item.nodeName.split(":")[1] : item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};

function readFile(file) {
  var reader = new FileReader();
  console.log(reader.readAsText(reader.readAsText(file)))
}

function renderData(incommingData) {
  // ZAGLAVLJE

const documentHeader = incommingData.DocumentEnvelope.DocumentHeader
const documentBody = incommingData.DocumentEnvelope.DocumentBody
const inovice = incommingData.DocumentEnvelope.DocumentBody.Invoice

const primalac = document.getElementById("primalac")
const brojDokumenta = document.getElementById("brojDokumenta")
const datumKreiranja = document.getElementById("datumKreiranja")
const datumPlacanja = document.getElementById("datumPlacanja")

primalac.innerText= inovice.BuyerReference["#text"]
brojDokumenta.innerText= inovice.ID["#text"]
datumKreiranja.innerText= inovice.IssueDate["#text"]
datumPlacanja.innerText= inovice.DueDate["#text"]

// OD INFO

const izdavaoc = document.getElementById("izdavaoc")
const pib_izdavaoc = document.getElementById("pib_izdavaoc")
const adresa_izdavaoc = document.getElementById("adresa_izdavaoc")

const posaljiocData = inovice.AccountingSupplierParty.Party

izdavaoc.innerText = posaljiocData.PartyName.Name["#text"]
pib_izdavaoc.innerText = posaljiocData.EndpointID["#text"]
adresa_izdavaoc.innerText = posaljiocData.PostalAddress.StreetName["#text"] + " " + posaljiocData.PostalAddress.AdditionalStreetName["#text"] + ", " + posaljiocData.PostalAddress.CityName["#text"] + ", " + posaljiocData.PostalAddress.PostalZone["#text"] + " " + posaljiocData.PostalAddress.Country.Name["#text"]

// ZA INFO

const primaoc = document.getElementById("primaoc")
const pib_primaoc = document.getElementById("pib_primaoc")
const adresa_primaoc = document.getElementById("adresa_primaoc")

const primaocData = inovice.AccountingCustomerParty.Party

primaoc.innerText = primaocData.PartyName.Name["#text"]
pib_primaoc.innerText = primaocData.EndpointID["#text"]
adresa_primaoc.innerText = primaocData.PostalAddress.StreetName["#text"] + ", " + primaocData.PostalAddress.CityName["#text"] + ", " + primaocData.PostalAddress.PostalZone["#text"]

// MESTO ISPORUKE INFO

const mesto_isporuke = document.getElementById("mesto_isporuke")

const mestoIsporukeData = inovice.Delivery

mesto_isporuke.innerText = 
  mestoIsporukeData.DeliveryParty.PartyName.Name["#text"] + ", " + 
  mestoIsporukeData.DeliveryLocation.Address.StreetName["#text"] + ", " + 
  mestoIsporukeData.DeliveryLocation.Address.PostalZone["#text"] + " " + 
  mestoIsporukeData.DeliveryLocation.Address.CityName["#text"]

// ARTIKLI 

const artikliTabla = document.getElementById("artikli")

const artikliData = inovice.InvoiceLine



let innerHtmlArtikli = ""

artikliData.slice().reverse().forEach(element => {
  innerHtmlArtikli += "<tr class='table-light' ><th scope='row'>" + 
  element.Item.StandardItemIdentification.ID["#text"] + "</th><td>" + 
  element.Item.Name["#text"] + "</th><td>" +
  parseInt(element.Item.ClassifiedTaxCategory.Percent["#text"]) + "%</th><td class='text-end'>" +
  formatMoney(element.InvoicedQuantity["#text"]) + "</th><td class='text-end'>" +
  formatMoney(element.Price.PriceAmount["#text"]) + "</th><td class='text-end'>" +
  formatMoney(element.LineExtensionAmount["#text"] / element.InvoicedQuantity["#text"]) + "</th><td class='text-end'>" +
  formatMoney(element.LineExtensionAmount["#text"]) + "</th></tr> "
  })

  artikliTabla.innerHTML = innerHtmlArtikli



// TOTALI

const totaliTabla = document.getElementById('totali')
const totaliData = inovice.TaxTotal

totaliTabla.innerHTML = 
`
<tr class='table-light' ><th scope='row' class="text-end">Ukupno po PS 10%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[0].TaxableAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupno po PS 20%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[1].TaxableAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupno bez poreza:</th><td class="text-end">${formatMoney(inovice.LegalMonetaryTotal.TaxExclusiveAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 20%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[0].TaxAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 10%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[1].TaxAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupan porez:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupan iznos:</th><td class='lead text-end'><strong>${formatMoney(inovice.LegalMonetaryTotal.TaxInclusiveAmount["#text"])}</strong></td>
`
}



// SHARED FUNCTIONS

function formatMoney(integer){
  return parseFloat(integer).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}
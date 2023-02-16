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
let inovice = incommingData.DocumentEnvelope.DocumentBody.Invoice
console.log("inovice: " + inovice)
if(inovice === undefined){
  inovice = incommingData.DocumentEnvelope.DocumentBody.CreditNote
}
const primaocData = inovice.AccountingCustomerParty.Party
const posaljiocData = inovice.AccountingSupplierParty.Party

const primalac = document.getElementById("primalac")
const brojDokumenta = document.getElementById("brojDokumenta")
const datumKreiranja = document.getElementById("datumKreiranja")
const datumPlacanja = document.getElementById("datumPlacanja")

primalac.innerText = primaocData.PartyName.Name["#text"]
brojDokumenta.innerText= inovice.ID["#text"]
datumKreiranja.innerText= inovice.IssueDate["#text"]
// datumPlacanja.innerText= inovice.DueDate["#text"]

// OD INFO

const izdavaoc = document.getElementById("izdavaoc")
const pib_izdavaoc = document.getElementById("pib_izdavaoc")
const adresa_izdavaoc = document.getElementById("adresa_izdavaoc")

// const posaljiocData = inovice.AccountingSupplierParty.Party

izdavaoc.innerText = posaljiocData.PartyName.Name["#text"]
pib_izdavaoc.innerText = posaljiocData.EndpointID["#text"]
adresa_izdavaoc.innerText = 
  posaljiocData.PostalAddress.CityName["#text"]

// ZA INFO

const primaoc = document.getElementById("primaoc")
const pib_primaoc = document.getElementById("pib_primaoc")
const adresa_primaoc = document.getElementById("adresa_primaoc")



primaoc.innerText = primaocData.PartyName.Name["#text"]
pib_primaoc.innerText = primaocData.EndpointID["#text"]
adresa_primaoc.innerText = primaocData.PostalAddress.StreetName["#text"] + ", " + primaocData.PostalAddress.CityName["#text"] + ", " + primaocData.PostalAddress.PostalZone["#text"]

// MESTO ISPORUKE INFO

const mesto_isporuke = document.getElementById("mesto_isporuke")

let mestoIsporukeData
let posaljiocName = posaljiocData.PartyName.Name["#text"]
console.log("posaljiocName:" + posaljiocName)
if(posaljiocName == 'Imlek'){
  mestoIsporukeData = inovice.AccountingCustomerParty
} else {
  mestoIsporukeData = inovice.Delivery
}



// ARTIKLI 

const artikliTabla = document.getElementById("artikli")
let artikliData
if(posaljiocName == 'Imlek'){
  artikliData = inovice.CreditNoteLine
} else {
  artikliData = inovice.InvoiceLine
}

console.log(artikliData.length)



let innerHtmlArtikli = ""
let itemBarcodeLine = ""

switch (posaljiocName) {
  case 'Imlek':
    artikliData = artikliData.slice().reverse();
    mesto_isporuke.innerText = 
    mestoIsporukeData.Party.PartyName.Name["#text"] + ", " + 
    mestoIsporukeData.Party.PostalAddress.StreetName["#text"] + ", " + 
    mestoIsporukeData.Party.PostalAddress.PostalZone["#text"] + " " + 
    mestoIsporukeData.Party.PostalAddress.CityName["#text"]
    break;
}

artikliData.slice().forEach(element => {
  console.log(element.Item.StandardItemIdentification !== undefined)
  switch (posaljiocName) {
    case 'AKRIS DOO':
      itemBarcodeLine = element["ID"]["#text"];
      break;
    case 'MERCATOR-S DOO-BEOGR':
    case 'Imlek':
      itemBarcodeLine = element.Item.StandardItemIdentification["ID"]["#text"];
      break;
    case 'M A R A doo':
      itemBarcodeLine = element.Item.SellersItemIdentification["ID"]["#text"];
      break;

    // todo remove the upper statement
      default:
      element.Item.StandardItemIdentification !== undefined ?  itemBarcodeLine = element.Item.StandardItemIdentification["ID"]["#text"] : itemBarcodeLine = "undefined"
      ;
  }
  let quantity
  if(posaljiocName == 'Imlek'){
    quantity = element.CreditedQuantity["#text"]
  } else {
    quantity = element.InvoicedQuantity["#text"]
  }
  
  innerHtmlArtikli += "<tr class='table-light' ><th scope='row'>" + 
  element.ID["#text"] + "</th><td>" + 
  itemBarcodeLine + "</th><td>" + 
  element.Item.Name["#text"] + "</th><td>" +
  parseInt(element.Item.ClassifiedTaxCategory.Percent["#text"]) + "%</th><td class='text-end'>" +
  formatMoney(quantity) + "</th><td class='text-end'>" +
  formatMoney(element.Price.PriceAmount["#text"]) + "</th><td class='text-end'>" +
  formatMoney(element.LineExtensionAmount["#text"] / quantity) + "</th><td class='text-end'>" +
  formatMoney(element.LineExtensionAmount["#text"]) + "</th></tr> "
  })

  artikliTabla.innerHTML = innerHtmlArtikli



// TOTALI

const totaliTabla = document.getElementById('totali')
const totaliData = inovice.TaxTotal

let innerHtmlData = ""

switch (posaljiocName) {
  case 'AKRIS DOO':
  case 'D Way d.o.o. D Way d.o.o. Beograd':
    innerHtmlData += `
    <tr class='table-light' ><th scope='row' class="text-end">Ukupno po PS 20%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal.TaxableAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupno bez poreza:</th><td class="text-end">${formatMoney(inovice.LegalMonetaryTotal.TaxExclusiveAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 20%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal.TaxAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupan porez:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupan iznos:</th><td class='lead text-end'><strong>${formatMoney(inovice.LegalMonetaryTotal.TaxInclusiveAmount["#text"])}</strong></td>
    `
    break;
  default:
    innerHtmlData += `
    <tr class='table-light' ><th scope='row' class="text-end">Ukupno po PS 10%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[0].TaxableAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupno po PS 20%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[1].TaxableAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupno bez poreza:</th><td class="text-end">${formatMoney(inovice.LegalMonetaryTotal.TaxExclusiveAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 20%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[0].TaxAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 10%:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[1].TaxAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupan porez:</th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxAmount["#text"])}</td>
    <tr class='table-light' ><th scope='row' class="text-end">Ukupan iznos:</th><td class='lead text-end'><strong>${formatMoney(inovice.LegalMonetaryTotal.TaxInclusiveAmount["#text"])}</strong></td>
    `;
}


totaliTabla.innerHTML = innerHtmlData

}



// SHARED FUNCTIONS

function formatMoney(integer){
  return parseFloat(integer).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}
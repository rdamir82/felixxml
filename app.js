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

// Example
// var xml = '<root><element attribute="value">Text</element></root>';
// var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
// var json = xmlToJson(xmlDoc);
// console.log(json);

  

function readFile(file) {
  var reader = new FileReader();
  console.log(reader.readAsText(reader.readAsText(file)))
}



// {
//   "DocumentEnvelope": {
//     "DocumentHeader": {
//       "SalesInvoiceId": 7953066,
//       "PurchaseInvoiceId": 7308885,
//       "DocumentId": "fa709f30-1892-4bb8-a296-777770ec16cb",
//       "CreationDate": "2023-01-02",
//       "SendingDate": "2023-01-03",
//     },
//     "DocumentBody": {
//       "Invoice": {
//         "CustomizationID": "urn:cen.eu:en16931:2017#compliant#urn:mfin.gov.rs:srbdt:2021",
//         "ID": "30002239-RI",
//         "IssueDate": "2023-01-03",
//         "DueDate": "2023-01-23",
//         "InvoiceTypeCode": 380,
//         "Note": "SO 30002580    Sklad. GP Subotica",
//         "DocumentCurrencyCode": "RSD",
//         "BuyerReference": "2213049 STR FELIX BR.5 CANTAVIR MARSALA TITA 28",
//         "InvoicePeriod": {
//           "DescriptionCode": 3
//         },
//         "OrderReference": "",
//         "DespatchDocumentReference": {
//           "ID": "30002239-RI"
//         },
//         "AdditionalDocumentReference": {
//           "ID": "2213049 STR FELIX BR.5 CANTAVIR MARSALA TITA 28",
//           "IssueDate": "2023-01-03",
//           "IssueTime": "00:37:49.487808+01:00",
//           "DocumentTypeCode": 130
//         },
//         "AccountingSupplierParty": {
//           "Party": {
//             "EndpointID": 100001636,
//             "PartyName": {
//               "Name": "Imlek"
//             },
//             "PostalAddress": {
//               "ID": 8601500000006,
//               "StreetName": "Industrijsko naselje bb",
//               "AdditionalStreetName": "Padinska skela",
//               "CityName": "Beograd",
//               "PostalZone": 11213,
//               "Country": {
//                 "IdentificationCode": "RS",
//                 "Name": "Srbija"
//               }
//             },
//             "PartyTaxScheme": {
//               "CompanyID": "RS100001636",
//               "TaxScheme": {
//                 "ID": "VAT"
//               }
//             },
//             "PartyLegalEntity": {
//               "RegistrationName": "Imlek",
//               "CompanyID": 7042701
//             }
//           }
//         },
//         "AccountingCustomerParty": {
//           "Party": {
//             "EndpointID": 100853671,
//             "PartyIdentification": {
//               "ID": 54984537
//             },
//             "PartyName": {
//               "Name": "STR FELIX ERIKA REKIC PR"
//             },
//             "PostalAddress": {
//               "ID": 0,
//               "StreetName": "ADI ENDREA 38",
//               "CityName": "CANTAVIR",
//               "PostalZone": 24220,
//               "Country": {
//                 "IdentificationCode": "RS"
//               }
//             },
//             "PartyTaxScheme": {
//               "CompanyID": "RS100853671",
//               "TaxScheme": {
//                 "ID": "VAT"
//               }
//             },
//             "PartyLegalEntity": {
//               "RegistrationName": "STR FELIX ERIKA REKIC PR",
//               "CompanyID": 54984537
//             }
//           }
//         },
//         "Delivery": {
//           "ActualDeliveryDate": "2023-01-03",
//           "DeliveryLocation": {
//             "ID": 0,
//             "Address": {
//               "StreetName": "MARSALA TITA 28",
//               "CityName": "CANTAVIR",
//               "PostalZone": 24200
//             }
//           },
//           "DeliveryParty": {
//             "PartyName": {
//               "Name": "2213049 STR FELIX BR.5"
//             }
//           }
//         },
//         "PaymentMeans": {
//           "PaymentMeansCode": 30,
//           "PaymentID": "30002239RI-2003567",
//           "PayeeFinancialAccount": {
//             "ID": 170003000595000100
//           }
//         },
//         "TaxTotal": {
//           "TaxAmount": 2829.72,
//           "TaxSubtotal": [
//             {
//               "TaxableAmount": 4855,
//               "TaxAmount": 970.99,
//               "TaxCategory": {
//                 "ID": "S",
//                 "Percent": 20,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             {
//               "TaxableAmount": 18587.28,
//               "TaxAmount": 1858.73,
//               "TaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             }
//           ]
//         },
//         "LegalMonetaryTotal": {
//           "LineExtensionAmount": 23442.28,
//           "TaxExclusiveAmount": 23442.28,
//           "TaxInclusiveAmount": 26272,
//           "AllowanceTotalAmount": 0,
//           "PrepaidAmount": 0,
//           "PayableAmount": 26272
//         },
//         "InvoiceLine": [
//           {
//             "ID": 15,
//             "InvoicedQuantity": 6,
//             "LineExtensionAmount": 941.51,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 19.21
//             },
//             "Item": {
//               "Name": "Zdravo!Mileram 22% 400g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG30028"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8606004220981
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 20,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 160.12
//             }
//           },
//           {
//             "ID": 14,
//             "InvoicedQuantity": 20,
//             "LineExtensionAmount": 1268.06,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 80.94
//             },
//             "Item": {
//               "Name": "Zdravo!Kis.pavlaka20%180g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG30010"
//               },
//               "StandardItemIdentification": {
//                 "ID": 86026017
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 20,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 67.45
//             }
//           },
//           {
//             "ID": 13,
//             "InvoicedQuantity": 6,
//             "LineExtensionAmount": 1323.41,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 27.01
//             },
//             "Item": {
//               "Name": "Zdravo!Kis.pavlaka20%700g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91182"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500121978
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 20,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 225.07
//             }
//           },
//           {
//             "ID": 12,
//             "InvoicedQuantity": 20,
//             "LineExtensionAmount": 1322.02,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 26.98
//             },
//             "Item": {
//               "Name": "Pavlaka Kravica 20% 180g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG90484"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500114468
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 20,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 67.45
//             }
//           },
//           {
//             "ID": 11,
//             "InvoicedQuantity": 6,
//             "LineExtensionAmount": 432.83,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 8.83
//             },
//             "Item": {
//               "Name": "Grekos jogurt visnja 150g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91246"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500124269
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 73.61
//             }
//           },
//           {
//             "ID": 10,
//             "InvoicedQuantity": 6,
//             "LineExtensionAmount": 432.83,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 8.83
//             },
//             "Item": {
//               "Name": "Grekos jogurt kajsija150g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91226"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500122197
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 73.61
//             }
//           },
//           {
//             "ID": 9,
//             "InvoicedQuantity": 12,
//             "LineExtensionAmount": 1858.46,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 206.5
//             },
//             "Item": {
//               "Name": "Mlek.Sub.Jogurt 1% 1.45kg PET",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91967"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500136330
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 172.08
//             }
//           },
//           {
//             "ID": 8,
//             "InvoicedQuantity": 8,
//             "LineExtensionAmount": 844.59,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 115.17
//             },
//             "Item": {
//               "Name": "Mlek.Sub.Jogurt 1% 975g PET",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91966"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500136316
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 119.97
//             }
//           },
//           {
//             "ID": 7,
//             "InvoicedQuantity": 100,
//             "LineExtensionAmount": 2904.72,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 59.28
//             },
//             "Item": {
//               "Name": "Zdravo!Jogurt 2.8% 180g casa",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG30002"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8606004222428
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 29.64
//             }
//           },
//           {
//             "ID": 6,
//             "InvoicedQuantity": 8,
//             "LineExtensionAmount": 844.59,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 115.17
//             },
//             "Item": {
//               "Name": "Pekarski jogurt 1% 975g PET",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91963"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500136255
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 119.97
//             }
//           },
//           {
//             "ID": 5,
//             "InvoicedQuantity": 6,
//             "LineExtensionAmount": 463.76,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 9.46
//             },
//             "Item": {
//               "Name": "Balans+ ferm.proiz. 500g TT",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91998"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500130147
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 78.87
//             }
//           },
//           {
//             "ID": 4,
//             "InvoicedQuantity": 30,
//             "LineExtensionAmount": 4821.31,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 98.39
//             },
//             "Item": {
//               "Name": "Mlek.Sub.Sveze ml.2%1.463L PET",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91881"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500133940
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 163.99
//             }
//           },
//           {
//             "ID": 3,
//             "InvoicedQuantity": 12,
//             "LineExtensionAmount": 1326.88,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 27.08
//             },
//             "Item": {
//               "Name": "Mlek.Sub.Sveze ml.2%0.968L PET",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91880"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500133902
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 112.83
//             }
//           },
//           {
//             "ID": 2,
//             "InvoicedQuantity": 12,
//             "LineExtensionAmount": 1449.3,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 29.58
//             },
//             "Item": {
//               "Name": "Krav.Sveze ml.2.8%D3 vit.1L DC",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91942"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500135685
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 123.24
//             }
//           },
//           {
//             "ID": 1,
//             "InvoicedQuantity": 18,
//             "LineExtensionAmount": 3208.01,
//             "AllowanceCharge": {
//               "ChargeIndicator": false,
//               "Amount": 65.47
//             },
//             "Item": {
//               "Name": "Sveze ml.2.8%D3 vit.1.463L PET",
//               "BuyersItemIdentification": "",
//               "SellersItemIdentification": {
//                 "ID": "BG91843"
//               },
//               "StandardItemIdentification": {
//                 "ID": 8601500133292
//               },
//               "ClassifiedTaxCategory": {
//                 "ID": "S",
//                 "Percent": 10,
//                 "TaxScheme": {
//                   "ID": "VAT"
//                 }
//               }
//             },
//             "Price": {
//               "PriceAmount": 181.86
//             }
//           }
//         ]
//       }
//     }
//   }
// }

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
  element.Item.ClassifiedTaxCategory.Percent["#text"] + "%</th><td class='text-end'>" +
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
<tr class='table-light' ><th scope='row' class="text-end">Ukupno po tarinoj stopi od 20%: <th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[0].TaxableAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupno po tarinoj stopi od 20%: <th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[1].TaxableAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupno bez poreza<th><td class="text-end">${formatMoney(inovice.LegalMonetaryTotal.TaxExclusiveAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 20% <th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[0].TaxAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Porez za tarifu od 10% <th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxSubtotal[1].TaxAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupan porez<th><td class="text-end">${formatMoney(inovice.TaxTotal.TaxAmount["#text"])}</td>
<tr class='table-light' ><th scope='row' class="text-end">Ukupan iznos<th><td class='lead text-end'><strong>${formatMoney(inovice.LegalMonetaryTotal.TaxInclusiveAmount["#text"])}</strong></td>
`
}



// SHARED FUNCTIONS

function formatMoney(integer){
  return parseFloat(integer).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}
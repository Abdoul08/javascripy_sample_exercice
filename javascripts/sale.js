const products = {
  
  1:{nom: "Mélange original 200g", prix: "200"},
  2:{nom: "Mélange original 500g", prix: "500"},
  3:{nom: "Mélange spécial 200g", prix: "700"},
  4:{nom: "Mélange spécial 500g", prix: "1200"},

}

const element = document.getElementById("product");
const nombre = document.getElementById("number");
let purchases = [];

function add() {
  const id=parseInt(element.value);
  if(id==0){
  window.alert("Veuillez sélectionner un produit");
  }
  const nom = products[id].nom;
  const prix = products[id].prix;
  const number = parseInt(nombre.value);
  let purchase = {
    nom:nom,
    prix: prix,
    number: number,
  };
  
  let newPurchase = true;

  purchases.forEach((item) => {
    if(item.prix === purchase.prix) {
      newPurchase = false;
    }
  })

  if(purchases.length < 1 || newPurchase) {
    purchases.push(purchase);
  } else {
    for(let i = 0; i < purchases.length; i++) {
      if(purchases[i].prix === purchase.prix) {
        purchases[i].number += purchase.number;
      }
    }
  }

  window.alert(`${display()}\nLe sous-total est :${subtotal()}Yens`);
  element.value = "";
  nombre.value = "";
}

function display() {
  let string = "";
  for(let i=0; i<purchases.length; i++){
    string += `${purchases[i].nom} ${purchases[i].prix}yen：${purchases[i].number}\n`;
  }
  return string;
}
 
function subtotal() {
  let sum = 0;
    for(let i=0; i<purchases.length; i++){
    sum += purchases[i].prix * purchases[i].number;
  }
  return sum;
}

function calc() {
  const sum = subtotal();
  const detail = display();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${detail}\n Le sous-total est ${sum}yens, et les frais d'expédition sont ${postage}yens. Le total est ${sum + postage}yens`);
  purchases = [];
  element.value = "";
  nombre.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000){
    return 500;
  } else {
    return 250;
  }
}
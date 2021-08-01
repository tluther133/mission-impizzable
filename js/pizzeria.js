function capitalize_inputs(str) { //function to capitalize inputs
  return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function placeOrder() { //function for placing an order
  //get inputs from form
  var name = capitalize_inputs($("input#name").val());
  var flavor = $("#pizza-flavor").val();
  var size = $("#pizza-size").val();
  var crust = $("#pizza-crust").val();
  var toppings = [];
  $.each($('input[name="toppings"]:checked'),
      function() {
          toppings.push($(this).val());
      });
  var number = $("#pizza-number").val();
  var sizeCost; //set different prices for the different pizza flavors depending on their size
  if (flavor === "Bbq Beef" || flavor === "Bbq Chicken" || flavor === "Hawaiian" || flavor === "Pulled Pork") {
      if (size === "Small") {
          sizeCost = 400;
      } else if (size === "Medium") {
          sizeCost = 650;
      } else if (size === "Large") {
          sizeCost = 900;
      }
  } else if (flavor === "Bbq Pork" || flavor === "Grilled Pork" || flavor === "Margharita" || flavor === "Marinara" || flavor === "Pepperoni") {
      if (size === "Small") {
          sizeCost = 450;
      } else if (size === "Medium") {
          sizeCost = 700;
      } else if (size === "Large") {
          sizeCost = 950;
      }
  } else if (flavor === "Chicken Tikka" || flavor === "Gamberi" || flavor === "Mushroom" || flavor === "Oyster" || flavor === "Spicy Veggie" || flavor === "Original Veggie") {
      if (size === "Small") {
          sizeCost = 500;
      } else if (size === "Medium") {
          sizeCost = 750;
      } else if (size === "Large") {
          sizeCost = 1100;
      }
  }
  var crustCost; //set prices for different crust types
  if (crust === "Gluten Free") {
      crustCost = 230;
  } else if (crust === "Hand Tossed") {
      crustCost = 200;
  } else if (crust === "Original") {
      crustCost = 150;
  } else if (crust === "Pan") {
      crustCost = 180;
  } else if (crust === "Stuffed") {
      crustCost = 250;
  } else if (crust === "Thin") {
      crustCost = 100;
  }
  var checkboxes = $('input[name="toppings"]:checked').length; //get number of checkboxes checked
  if (checkboxes <= 3) { //limit number of checkboxes allowed to not more than 3
      if (size === "Small") {
          var toppingsCost = checkboxes * 70;
      } else if (size === "Medium") {
          var toppingsCost = checkboxes * 100;
      } else if (size === "Large") {
          var toppingsCost = checkboxes * 130;
      }
      $("input[type='checkbox']:not(:checked)").prop({ //disable unchecked boxes
          disabled: true
      });
      $('#placeorder').prop('disabled', true); //deactivate button after order is made to prevent client from changing order once the order is placed
      $("#yourorder").show();
      var price = (sizeCost + crustCost + toppingsCost);
      var totalPrice = parseInt(price * number);
      $(".salutation").text("Hey" + " " + name + ". Here's your order:");
      $(".pizza-size").append('<tr><td id="pizza-size">' + size);
      $(".number").append('<tr><td id="number">' + number);
      $(".pizza-crust").append('<tr><td id="pizza-crust">' + crust);
      $(".pizza-flavor").append('<tr><td id="pizza-flavor">' + flavor);
      $(".pizzaTotal1").append('<tr><td id="pizzaTotal1">' + totalPrice);
      arrayTotal.push(totalPrice); //create an array for all total prices
      if (toppings == "") {
          $(".toppings").append('<tr><td id="pizza-toppings">' + "-");
      }
      if (toppings != "") {
          $(".toppings").append('<tr><td id="pizza-toppings">' + toppings);
      }
      $(".name").text(name);
  } else {
      document.getElementById("pizza-toppings-help").innerHTML = "Please select a maximum of 3!";
      document.getElementById("pizza-toppings-help").style.cssText = 'color:red !important' //overrides previous color styling
  }
}

function makeDelivery() {
  $("#deliveryConfirmation").show();
  var location = capitalize_inputs($("input#location").val()); //get delivery details
  var phone = $("input#phone").val();
  $(".location").text(location);
  $(".phone").text(phone);
  $("#delivery").hide();
}

$(document).ready(function() {
  $("#orders").submit(function(event) {
      event.preventDefault();
      placeOrder();
  });
  $("#deliveryDetails").submit(function(event) {
      event.preventDefault();
      makeDelivery();
  });
});

function cancelOrders() {
  location.reload(); //reload contents of page to original status
}

var arrayTotal = []; //global array used to store all total prices for each order

function deliveryOptions() {
  $("#deliveryOptions").show();
  $("#orderDetails").hide();
  document.getElementById("orders").reset(); //reset form
  $('#placeorder').prop('disabled', false); //enable place order button
  var checkoutTotal = 0;
  arrayTotal.forEach(function(index) {
      checkoutTotal = checkoutTotal + index;
  });
  $(".totalPick").text(checkoutTotal);
  var checkoutTotalDel = checkoutTotal + 200; //add Ksh.200 to checkout total when delivery is chosen
  $(".totalDel").text(checkoutTotalDel);
}

function pickUp() {
  $("#pickUpConfirmation").show();
  $("#yourorder").hide();
}

function deliver() {
  $("#delivery").show();
  $("#yourorder").hide();
}

function reloadPage() {
  location.reload(); //reload contents of page to original status
}

function clearTextarea() {
  $("#messageForm").reset(); //reset textarea inputs
}

function addOrder() {
  $('#placeorder').prop('disabled', false); //enable button
  $("input[type='checkbox']").prop({ //enable checkboxes
      disabled: false
  });
  $("input[type='checkbox']").prop({ //uncheck previously checked checkboxes
      checked: false
  });
} 
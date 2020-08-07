var items=[];
var exp_dates=[];
var days=[];
check_empty(items)
function check_empty(items) {
  var noitems=items.length;
  if (noitems==0) {
    alert("Your fridge is empty! Restock.")
  }
}
function pre_add(y) {
  items.push(y);
  return items;
}
function pre_add_dates(y) {
  exp_dates.push(y);
  return exp_dates;
}
function pre_add_days(y) {
  days.push(y);
  return days;
}
function add_item() {
  var x=document.getElementById("item").value;
  if (x=="") {
    alert("You haven't added anything to the fridge!")
  } else {
    items=pre_add(x);
    document.getElementById("col").innerHTML = ""
    var i;
    for (i=0; i<items.length; i++) {
      if (exp_dates[i] == undefined) {
        document.getElementById("col").innerHTML += items[i] + "<br>";
      } else if (Math.sign(days[i])==-1) {
        document.getElementById("col").innerHTML += items[i] + " - expired: " + exp_dates[i] +", " + Math.abs(days[i]) + " days ago!" + "<br>";
      } else if (Math.sign(days[i])==0) {
        document.getElementById("col").innerHTML += items[i] + " - expires: " + exp_dates[i] + ", today!"+"<br>";
      } else {
        document.getElementById("col").innerHTML += items[i] + " - expires: " + exp_dates[i] + ", in "+ days[i]+ " days!" +"<br>";
      }
    }
  }
}
function remove_item() {
  var x=document.getElementById("remove").value;
  var index=items.indexOf(x);
  if (index>-1) {
    items.splice(index, 1);
    exp_dates.splice(index, 1);
    days.splice(index, 1);
    document.getElementById("col").innerHTML = ""
    var i;
    for (i=0; i<items.length; i++) {
      if (exp_dates[i] == undefined) {
        document.getElementById("col").innerHTML += items[i] + "<br>";
      } else if (Math.sign(days[i])==-1) {
        document.getElementById("col").innerHTML += items[i] + " - expired: " + exp_dates[i] +", " + Math.abs(days[i]) + " days ago!" + "<br>";
      } else if (Math.sign(days[i])==0) {
        document.getElementById("col").innerHTML += items[i] + " - expires: " + exp_dates[i] + ", today!"+"<br>";
      } else {
        document.getElementById("col").innerHTML += items[i] + " - expires: " + exp_dates[i] + ", in "+ days[i]+ " days!" +"<br>";
      }
    }
    check_empty(items)
  } else {
    alert("That item is not in the fridge!")
  }
}
function add_exp_dates() {
  today=new Date();
  var exp=document.getElementById("expiry_date").value;
  var expiry=new Date(exp);
  exp_dates=pre_add_dates(expiry);
  var one_day=1000*60*60*24;
  days_left=Math.ceil((expiry.getTime()-today.getTime())/(one_day));
  if (Math.sign(days_left)==-1) {
    days_left=(Math.ceil((today.getTime()-expiry.getTime())/(one_day)))-1;
    alert("It has already expired! Expired "+days_left+" days ago!");
    days_left = -Math.abs(days_left);
    days = pre_add_days(days_left);
  } else if (Math.sign(days_left)==0) {
    alert("Expires today! Consume immediately.");
    days = pre_add_days(days_left);
  } else {
    alert(days_left+" days left until it expires!");
    days = pre_add_days(days_left);
  }
  document.getElementById("col").innerHTML = ""
  var i;
  for (i=0; i<items.length; i++) {
    if (exp_dates[i] == undefined) {
      document.getElementById("col").innerHTML += items[i] + "<br>";
    } else if (Math.sign(days[i])==-1) {
      document.getElementById("col").innerHTML += items[i] + " - expired: " + exp_dates[i] +", " + Math.abs(days[i]) + " days ago!" + "<br>";
    } else if (Math.sign(days[i])==0) {
      document.getElementById("col").innerHTML += items[i] + " - expires: " + exp_dates[i] + ", today!"+"<br>";
    } else {
      document.getElementById("col").innerHTML += items[i] + " - expires: " + exp_dates[i] + ", in "+ days[i]+ " days!" +"<br>";
    }
  }
}
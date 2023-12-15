/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
// Cost-related variables
var full = document.getElementById("full");
var half = document.getElementById("half");
var dailyRate = 0;
let lastClickedButton = null;

var cost = document.getElementById("calculated-cost");

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

let selectedDays = [];
const dayItems = document.querySelectorAll('.blue-hover:not(#clear-button):not(#full):not(#half)');
dayItems.forEach(function(item) {
    item.addEventListener('click', function() {
        clickDay(item);
    });
});

function clickDay(item){
    const isClicked = item.classList.contains('clicked');

    if (isClicked) {
        item.classList.remove('clicked');
        const index = selectedDays.indexOf(item.id);
        if (index !== -1) {
            selectedDays.splice(index, 1);
        }
        item.style.backgroundColor = '#fff';
    } else {
        item.classList.add('clicked');
        selectedDays.push(item.id);
        item.style.backgroundColor = '#E5AF42';
    }

    if (lastClickedButton != item){
        calculation();
    }

    lastClickedButton = item;
}


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

const clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener('click', function() {
    selectedDays.length = 0;

    dayItems.forEach(function(item){
        item.classList.remove('clicked');
        const index = selectedDays.indexOf(item.id);
        if (index !== -1) {
            selectedDays.splice(index, 1);
        }
        item.style.backgroundColor = '#fff';
    });
    calculation();
});




/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

half.addEventListener('click', function() {
  half.classList.add('clicked');
  half.style.backgroundColor = '#E5AF42';
  full.classList.remove('clicked');
  full.style.backgroundColor = '#fff';
  // dailyRate = 20;
  calculation();
});



// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
full.addEventListener('click', function() {
  full.classList.add('clicked');
  full.style.backgroundColor = '#E5AF42';
  half.classList.remove('clicked');
  half.style.backgroundColor = '#fff';
  // dailyRate = 35;
  calculation();
});




/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculation(){
  if (full.classList.contains('clicked')){
      dailyRate = 35;
  }
  else{
      dailyRate = 20;
  }
  cost.textContent = dailyRate * selectedDays.length;
}


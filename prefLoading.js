// declare default prefs if no saved user prefs
let gorePref = 0; //default to blacklist
let killPref = 0;
let paraPref = 0;
let clausPref = 0;
let psychPref = 0;

// load anything in localStorage with key "fearless_prefs"
let savedPrefs = localStorage.getItem("fearless_prefs");

// if "fearless_prefs" found in local storage
if (savedPrefs) {
  // convert to JSON
  savedPrefs = JSON.parse(savedPrefs);
  // if a gore value
  if (savedPrefs.gore) {
    // set gorePref to saved value
    gorePref = savedPrefs.gore;
  }

  if (savedPrefs.kill) {
    killPref = savedPrefs.kill;
  }

  if (savedPrefs.para) {
    paraPref = savedPrefs.para;
  }

  if (savedPrefs.claus) {
    clausPref = savedPrefs.claus;
  }

  if (savedPrefs.psych) {
    psychPref = savedPrefs.psych
  }
}

// select all divs with class "review"
let reviews = document.querySelectorAll(".review");

// iterate through each one
reviews.forEach((review) => {
  
  // if any dataset setting exceeds preference, hide that div by adding class "hidden"
  if ((review.dataset.gore > gorePref) || (review.dataset.kill > killPref) || (review.dataset.para > paraPref) || (review.dataset.claus > clausPref) || (review.dataset.psych > psychPref)) {
    review.classList.add("hidden");
  }
});

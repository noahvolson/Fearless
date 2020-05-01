// get the entire form - the <form> element and its children
let prefsForm = document.querySelector("#preferences");

// Attach submit event listener to the form
// triggers doSaveForm() function when #savePrefs button is clicked
prefsForm.addEventListener("submit", doSaveForm, false);

// handles the submit
function doSaveForm(event) {
  // Don't submit the form "normally" as that would redirect to a new page
  event.preventDefault();
  let goreLevel = prefsForm.elements["gore"].value;
  let killLevel = prefsForm.elements["killer"].value;
  let paraLevel = prefsForm.elements["paranormal"].value;
  let clausLevel = prefsForm.elements["claustrophobia"].value;
  let psychLevel = prefsForm.elements["psychological"].value;

  let pushSelf = 0;
  if (prefsForm.elements["pushSelf"].checked == true) {
    pushSelf = 1;
  }

  let prefs2save = {
    gore: (parseInt(goreLevel) + pushSelf * !(!parseInt(goreLevel))),
    kill: (parseInt(killLevel) + pushSelf * !(!parseInt(killLevel))),
    para: (parseInt(paraLevel) + pushSelf * !(!parseInt(paraLevel))),
    claus: (parseInt(clausLevel) + pushSelf * !(!parseInt(clausLevel))),
    psych: (parseInt(psychLevel) + pushSelf * !(!parseInt(psychLevel))),
    push: pushSelf
  };


  prefs2save = JSON.stringify(prefs2save);
  if (typeof Storage !== "undefined") {
    // Code for localStorage/sessionStorage.
    localStorage.setItem("fearless_prefs", prefs2save);
    M.toast({
      html: "Preferences Saved",
      displayLength: 1500
    });
  } else {
    // Sorry! No Web Storage support..
    M.toast({
      html:
        "<strong>Warning: Your browser doesn't support localStorage</strong>",
      classes: "red"
    });
  }
}

// load anything in localStorage with key "fearless_prefs"
let savedPrefs = localStorage.getItem("fearless_prefs");

// if "fearless_prefs" found in local storage
if (savedPrefs) {
  // convert to JSOn
  savedPrefs = JSON.parse(savedPrefs);

  // if a gore value
  if (savedPrefs.gore) {
    prefsForm.elements["gore"].forEach((elem) => {
      if (elem.value == (savedPrefs.gore - savedPrefs.push)) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  }

  // if a killer value
  if (savedPrefs.kill) {
    prefsForm.elements["killer"].forEach((elem) => {
      if (elem.value == (savedPrefs.kill - savedPrefs.push)) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  }

  // if a paranormal value
  if (savedPrefs.para) {
    prefsForm.elements["paranormal"].forEach((elem) => {
      if (elem.value == (savedPrefs.para - savedPrefs.push)) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  }

  // if a claustrophobia value
  if (savedPrefs.claus) {
    prefsForm.elements["claustrophobia"].forEach((elem) => {
      if (elem.value == (savedPrefs.claus - savedPrefs.push)) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  }
  
  // if a psychological value
  if (savedPrefs.psych) {
    prefsForm.elements["psychological"].forEach((elem) => {
      if (elem.value == (savedPrefs.psych - savedPrefs.push)) {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
  }

  // if a pushSelf
  if (savedPrefs.push == 1) {
    prefsForm.elements["pushSelf"].checked = true;
  }
    
}

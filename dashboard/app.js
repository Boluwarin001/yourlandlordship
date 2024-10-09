const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainSearch = document.getElementById('mainSearch');
const mainSearchInput = document.getElementById('mainSearchInput');
const searchResults = document.getElementById('searchResults');

let sideBarActive = false;
let searchActive = false;


// page transitions

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('page').style.opacity = 1;
  document.getElementById('page').style.transform = 'scale(1)';
});


var anchors = document.getElementsByTagName("a");
for (var i = 0, length = anchors.length; i < length; i++) {
  var anchor = anchors[i];
  anchor.addEventListener('click', function() {
    event.preventDefault();
    pager(this.getAttribute("href"));
  }, true);
};

function pager(e, external=false) {
  document.getElementById('page').style.opacity = 0;
  document.getElementById('page').style.transform = " scale(0.9)";
  setTimeout(function(){
      if (!external) {
        window.location.href = e;
      }else{
          // open in new tab
      }

  }, 500);
};

document.addEventListener("visibilitychange", () => {
  document.getElementById('page').style.opacity = 1;
  document.getElementById('page').style.transform = "translateX(0)";
});

// dark mode
let darkMode = localStorage.getItem('darkMode');

function toggleDarkMode() {
  darkMode === 'enabled' ? disableDarkMode() : enableDarkMode();
  showModeIcons();
}

function showModeIcons() {
  const [add, remove] = darkMode === 'enabled' ? ['light', 'dark'] : ['dark', 'light'];
  document.querySelectorAll(`.${remove}-mode-icon`).forEach(icon => icon.classList.add('hide'));
  document.querySelectorAll(`.${add}-mode-icon`).forEach(icon => icon.classList.remove('hide'));
}

function enableDarkMode(){
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
  darkMode = 'enabled';
}

function disableDarkMode(){
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
  darkMode = null;
}

darkMode === 'enabled' ? enableDarkMode() : disableDarkMode();
showModeIcons();

// Function to fade out elements with increasing speed in reverse order
function fadeOutContent(parentDiv) {
  return new Promise((resolve) => {
    let children = Array.from(document.getElementById(parentDiv).children[0].children).reverse();
    let baseDelay = 100;
    let speedFactor = 0.85;

    for (let i = 0; i < children.length; i++) {
      let delay = baseDelay * Math.pow(speedFactor, i);
      setTimeout(function() {
        children[i].style.opacity = "0";

        if (i === children.length - 1) {
          setTimeout(resolve, delay * (i + 1)); 
        }
      }, delay * i);
    }
  });
}

// Function to fade in elements with increasing speed
function fadeInContent(parentDiv) {
  return new Promise((resolve) => {
    let children = Array.from(document.getElementById(parentDiv).children[0].children);
    console.log(children);
    let baseDelay = 100;
    let speedFactor = 0.85;

    for (let i = 0; i < children.length; i++) {
      let delay = baseDelay * Math.pow(speedFactor, i);
      setTimeout(function() {
        children[i].style.opacity = "1";

        if (i === children.length - 1) {
          setTimeout(resolve, delay * (i + 1));
        }
      }, delay * i);
    }
  });
}

function closeSidebar() {
  fadeOutContent('sidebar').then(() => {
    sidebar.style.display = "none";
  });
  sideBarActive = false;
}

function openSidebar(){
  sidebar.style.display = "block";
  fadeInContent('sidebar');
  sideBarActive = true;
}

function toggleSidebar() {
  document.getElementById('bottom-apps-icon').classList.toggle('main-color');
  
  if (sideBarActive) {
    closeSidebar();
  } else {
    openSidebar();
  }
}



function toggleShrinkSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
  closeAllSubMenus()
}


function toggleSubMenu(button){
  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }
  
  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')
  
  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}


function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

function togglePageRight(){
  document.getElementById('pageRight').style.display = 'block';
  document.getElementById('pageRight').classList.toggle('page-right-hide');
  document.getElementById('bottom-not-icon').classList.toggle('main-color');
}

// if width <1200, togglePageRight
if(window.innerWidth < 1200){
  togglePageRight();
  document.getElementById('bottom-not-icon').classList.toggle('main-color');
}


function showSearchBar(){
  mainSearch.style.display = 'flex';
  searchActive = true;
  mainSearch.classList.remove('animate__fadeOutDown');
  mainSearch.classList.add('animate__fadeInUp');
  document.getElementById('mainSearchInput').focus();
}

function hideSearchBar(){
  mainSearch.classList.remove('animate__fadeInUp');
  mainSearch.classList.add('animate__fadeOutDown');
  setTimeout(() => {
    mainSearch.style.display = 'none';
  }, 500);
  searchActive = false;
}


function toggleSearch(){
  document.getElementById('bottom-search-icon').classList.toggle('main-color');
  if(searchActive){
    hideSearchBar();
  }else{
    showSearchBar();
  }
}


// when searchInput starts typing, show search results
mainSearchInput.addEventListener('input', function(){
  console.log('input');
  if(mainSearchInput.value.length > 0){
    searchResults.style.display = 'block';
  }
  else{
    searchResults.style.display = 'none';
  }
});
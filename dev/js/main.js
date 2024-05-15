document.addEventListener("DOMContentLoaded", () => {
  const accordionItem = document.querySelectorAll(".js-accordion-btn");
  accordionItem.forEach(accordion => {
    accordion.addEventListener("click", () => {
      accordion.closest(".accordion").classList.toggle("is-open");
    });
  });

  // Changing the order of sections on mobile resolution
  // function swapSections() {
    // const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    // const mainContent = document.getElementById('MainContent');
    // const imageBannerSections = document.querySelectorAll('.image-banner');
    // const categoriesSection = document.querySelector('.categories');
    // // Will only work for the home page
    // if (window.location.pathname === '/') {
    //     if (viewportWidth <= 767) {
    //         // Swap the order of the sections
    //         mainContent.insertBefore(categoriesSection, imageBannerSections[1]);
    //     } else {
    //         // Restore the original order
    //         mainContent.insertBefore(imageBannerSections[1], categoriesSection);
    //     }
    // }
  // }

  //Categories
  // window.addEventListener("load", swapSections);
  // window.addEventListener("resize", swapSections);
  let swiper = Swiper;
  let init = false;
  function swiperMode() {
    let tablet = window.matchMedia("(min-width: 768px)");
    if (tablet.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper(".categories__items", {
          slidesPerView: "auto",
          spaceBetween: 8,
          loop: true,
        });
      }
    } else {
      swiper.destroy();
      init = false;
    }
  }

  window.addEventListener("load", function () {
    swiperMode();
  });

  window.addEventListener("resize", function () {
    swiperMode();
  });

  //Featured products
  const newArrivalsList = new Swiper(".featured-products__list", {
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: true,
  });

  //Change active page
  const setActivePage = () => {
    const pathname = window.location.pathname;

    const navLinksEls = document.querySelectorAll(".top-menu__anchor");

    [...navLinksEls].forEach(link => {
      link.addEventListener("click", event => {
        sessionStorage.setItem("active-link", event.target.textContent);
      });

      if (pathname.includes("collections/all")) {
        const activeLink = sessionStorage.getItem("active-link");

        if (activeLink === "Shop" || activeLink === "Collections") {
          link.textContent === activeLink
            ? link.classList.add("active")
            : link.classList.remove("active");
        }
      }
    });
  }
  setActivePage();

    if(document.querySelectorAll('.faq-list').length) {
    
        // Get all elements with class .faq-hide-list__head and .faq-hide-list__quests
        var hideListHeads = document.querySelectorAll('.faq-hide-list__head');
        var hideListQuests = document.querySelectorAll('.faq-hide-list__quests');

        // Get the containers into which we will insert new elements
        var headTabsContainer = document.querySelector('.faq-list__head-tabs');
        var listQuestsContainer = document.querySelector('.faq-list__quests');

        var listQuestsLink = document.querySelector('.faq-list__title a');

        var listQuestsTitle = document.querySelector('.faq-list__title h2');

        var listQuestsTitleText = listQuestsTitle.textContent;

        // Function for creating and returning a copy of the button
        function createButtonCopy(originalButton) {
            var newButton = document.createElement('button');
            newButton.className = 'tablinks';
            newButton.innerHTML = originalButton.innerHTML;
            newButton.setAttribute('data-target', originalButton.getAttribute('data-target'));

            return newButton;
        }

        // Copy buttons
        hideListHeads.forEach(function(hideListHead) {
            var button = hideListHead.querySelector('.tablinks');
            if (button) {
                var newButton = createButtonCopy(button);
                headTabsContainer.appendChild(newButton);
            }
        });

        // Copying the contents of quests
        hideListQuests.forEach(function(hideListQuest) {
            listQuestsContainer.innerHTML += hideListQuest.innerHTML;
        });

        function switchTab(event) {
            var targetId = event.currentTarget.getAttribute('data-target');


            if (window.matchMedia("(max-width: 768px)").matches) { 
                var targetText = event.currentTarget.textContent;

                listQuestsLink.classList.add('disable');
    
                listQuestsTitle.textContent = targetText;
            }

        
            // Hide all .tabcontent and remove the active class from all buttons
            document.querySelectorAll('.tabcontent').forEach(function(tabContent) {
                tabContent.style.display = 'none';
                tabContent.classList.remove('active');
            });
        
            headTabsContainer.querySelectorAll('.tablinks').forEach(function(tabLink) {
                tabLink.classList.remove('active');
            });
        
            // Display only the selected .tabcontent and add the active class to the button
            var targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.style.display = 'block';
                targetTab.classList.add('active');
        
                event.currentTarget.classList.add('active');
            }
        }

        if (window.matchMedia("(max-width: 768px)").matches) { 
            listQuestsLink.addEventListener('click', function(event) {
                if (this.classList.contains('disable')) {
                    event.preventDefault();
    
                    listQuestsLink.classList.remove('disable');
                    listQuestsTitle.textContent = listQuestsTitleText;
    
                    document.querySelectorAll('.tabcontent').forEach(function(tabContent) {
                        tabContent.style.display = 'none';
                        tabContent.classList.remove('active');
                    });
                
                    headTabsContainer.querySelectorAll('.tablinks').forEach(function(tabLink) {
                        tabLink.classList.remove('active');
                    });
    
                    headTabsContainer.style.display = '';
                } else {
                    
                }
            });
        }
        

        headTabsContainer.querySelectorAll('.tablinks').forEach(function(tabLink) {
            tabLink.addEventListener('click', switchTab);
        });
        
        // Check if the screen width meets the minimum of 768px
        if (window.matchMedia("(min-width: 768px)").matches) {
            // Activate the first tab and its corresponding content
            var firstTabLink = headTabsContainer.querySelector('.tablinks');
            if (firstTabLink) {
                firstTabLink.classList.add('active');
                var firstTabId = firstTabLink.getAttribute('data-target');
                var firstTabContent = document.getElementById(firstTabId);
                if (firstTabContent) {
                    firstTabContent.style.display = 'block';
                    firstTabContent.classList.add('active');
                }
            }
        }

        if (window.matchMedia("(max-width: 768px)").matches) {
            // Activate the first tab and its corresponding content
            headTabsContainer.querySelectorAll('.tablinks').forEach(function(tabLink) {
                tabLink.addEventListener('click', function() {
                    headTabsContainer.style.display = 'none';
                });
            });
        }

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
            });
        }
    }
});
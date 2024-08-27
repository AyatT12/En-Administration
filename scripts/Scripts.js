// ******************************************************************sidebar toggle script*************************************************************************************//
// Variables
const body = document.querySelector('body'),
      sidebar = body.querySelector('.sidebar'),
      sidebar2 = body.querySelector('.sidebar2')
      toggles1 = [
        { toggle: body.querySelector(".toggle"), sidebarToToggle: sidebar, sidebarToClose: sidebar2 },
        { toggle: body.querySelector(".toggle4"), sidebarToToggle: sidebar, sidebarToClose: sidebar2 },
      ];
    toggles2 =[
      { toggle: body.querySelector(".toggle2"), sidebarToToggle: sidebar2, sidebarToClose: sidebar },
    ]
// Event Listeners
toggles1.forEach(({ toggle, sidebarToToggle, sidebarToClose }) => {
  toggle.addEventListener("click", () => {
    const collapsibleElements = sidebar.querySelectorAll('.collapse');
      collapsibleElements.forEach(element => {
        const collapseInstance = bootstrap.Collapse.getInstance(element);
        if (collapseInstance) {
          collapseInstance.hide();
        }
      });
    setTimeout(() => {
      sidebarToToggle.classList.toggle("close");
      sidebarToClose.classList.add("close2");
    }, 300); 
  });
});
toggles2.forEach(({ toggle, sidebarToToggle, sidebarToClose }) => {
  toggle.addEventListener("click", () => {
    sidebarToToggle.classList.toggle("close2");
    sidebarToToggle.classList.add("open");
    const collapsibleElements = sidebar.querySelectorAll('.collapse');
    collapsibleElements.forEach(element => {
      const collapseInstance = bootstrap.Collapse.getInstance(element);
      if (collapseInstance) {
        collapseInstance.hide();
      }
    });
    setTimeout(() => { sidebarToClose.classList.add("close");
    },300)
  });
});



// *******************************************************************************************************************************************************//

sidebar.addEventListener('mouseenter', function() {
  sidebar.classList.remove("close");
  sidebar2.classList.add("close2");
});

// sidebar.addEventListener('mouseleave', function() {
//   const collapsibleElements = sidebar.querySelectorAll('.collapse');
//   collapsibleElements.forEach(element => {
//     const collapseInstance = bootstrap.Collapse.getInstance(element);
//     if (collapseInstance) {
//       collapseInstance.hide();
//     }
//   });

//   setTimeout(() => {
//     sidebar.classList.add("close");
//     sidebar.classList.remove("close2");
//   }, 300); 
// });

//***************************************************************************main sidebar collapse script****************************************************************************** */

const collapsibleElements = sidebar.querySelectorAll('.collapse');

collapsibleElements.forEach(element => {
  element.addEventListener('show.bs.collapse', function() {
    collapsibleElements.forEach(otherElement => {
      if (otherElement !== element) {
        const collapseInstance = bootstrap.Collapse.getInstance(otherElement);
        if (collapseInstance) {
          collapseInstance.hide();
        }
      }
    });
  });
});

//**************************************************************************alert sidebar collapse script******************************************************************************* */

const collapse = document.querySelectorAll(".accordion-item");

collapse.forEach(item => {
  item.querySelector(".accordion-item-header").addEventListener("click", () => {
    item.classList.toggle("open");
    collapse.forEach(otherElement => {
      if (otherElement !== item) {
        otherElement.classList.remove("open");
      }
    });
  });
});

//*****************************************************************initialize tooltips*************************************************************************************** */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
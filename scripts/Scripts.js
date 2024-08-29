// ******************************************************************sidebar toggle script*************************************************************************************//
// Variables
const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  sidebar2 = body.querySelector(".sidebar2");
toggles1 = [
  {
    toggle: body.querySelector(".toggle"),
    sidebarToToggle: sidebar,
    sidebarToClose: sidebar2,
  },
  {
    toggle: body.querySelector(".toggle4"),
    sidebarToToggle: sidebar,
    sidebarToClose: sidebar2,
  },
];
toggles2 = [
  {
    toggle: body.querySelector(".toggle2"),
    sidebarToToggle: sidebar2,
    sidebarToClose: sidebar,
  },
];
// Event Listeners
toggles1.forEach(({ toggle, sidebarToToggle, sidebarToClose }) => {
  toggle.addEventListener("click", () => {
    const collapsibleElements = sidebar.querySelectorAll(".collapse");
    collapsibleElements.forEach((element) => {
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
    const collapsibleElements = sidebar.querySelectorAll(".collapse");
    collapsibleElements.forEach((element) => {
      const collapseInstance = bootstrap.Collapse.getInstance(element);
      if (collapseInstance) {
        collapseInstance.hide();
      }
    });
    setTimeout(() => {
      sidebarToClose.classList.add("close");
    }, 300);
  });
});

// *******************************************************************************************************************************************************//

sidebar.addEventListener("mouseenter", function () {
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

const collapsibleElements = sidebar.querySelectorAll(".collapse");

collapsibleElements.forEach((element) => {
  element.addEventListener("show.bs.collapse", function () {
    collapsibleElements.forEach((otherElement) => {
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

collapse.forEach((item) => {
  item.querySelector(".accordion-item-header").addEventListener("click", () => {
    item.classList.toggle("open");
    collapse.forEach((otherElement) => {
      if (otherElement !== item) {
        otherElement.classList.remove("open");
      }
    });
  });
});

//*****************************************************************initialize tooltips*************************************************************************************** */

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// //***************************************************************** inputs collapses toggle *************************************************************************************** */
const inputsAccordion = document.querySelectorAll(".inputs-accordion-item");

inputsAccordion.forEach((item) => {
  item
    .querySelector(".inputs-accordion-item-header")
    .addEventListener("click", () => {
      item.classList.toggle("open");
      inputsAccordion.forEach((otherElement) => {
        if (otherElement !== item) {
          otherElement.classList.remove("open");
        }
      });
    });
});
// //***************************************************************** inputs collapses green circle validation*************************************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".inputs-accordion-item");

  accordionItems.forEach((item) => {
    const inputs = item.querySelectorAll("input, select, textarea");
    const checkIcon = item.querySelector(".data-check");

    const validateInputs = () => {
      let allValid = true;
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          allValid = false;
        }
      });

      if (allValid) {
        checkIcon.style.backgroundColor = "green";
      } else {
        checkIcon.style.backgroundColor = "";
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("input", validateInputs);
      input.addEventListener("blur", validateInputs);
    });
  });
});
// //***************************************************************** move foucs between fields*************************************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".inputs-accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".inputs-accordion-item-header");
    const focusableElements = item.querySelectorAll("input, select, textarea");

    header.addEventListener("click", function () {
      setTimeout(() => {
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }, 300);
    });

    focusableElements.forEach((element, index) => {
      element.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          const nextElement = focusableElements[index + 1];
          if (nextElement) {
            nextElement.focus();
          }
        }
      });
    });
  });
});

// //********************************************************************** validation form submit ********************************************************************************** */
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation');

  const openAccordionItem = (item, inputsAccordion) => {
      item.classList.add("open");
      inputsAccordion.forEach(otherElement => {
          if (otherElement !== item) {
              otherElement.classList.remove("open");
          }
      });
  };

  const validateAccordionSections = (form) => {
      const accordionItems = form.querySelectorAll('.inputs-accordion-item');
      let formIsValid = true;
      let firstInvalidInput = null;

      Array.from(accordionItems).forEach(item => {
          const inputs = item.querySelectorAll('input, select, textarea');
          const checkIcon = item.querySelector('.data-check');
          let sectionIsValid = true;

          Array.from(inputs).forEach(input => {
              if (!input.checkValidity()) {
                  sectionIsValid = false;
                  if (!firstInvalidInput) {
                      firstInvalidInput = input;
                      openAccordionItem(item, accordionItems);
                  }
              }
          });

          checkIcon.style.backgroundColor = sectionIsValid ? 'green' : '';
      });

      if (firstInvalidInput) {
          firstInvalidInput.focus();
          formIsValid = false;
      }

      return formIsValid;
  };

  Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
          const isFormValid = validateAccordionSections(form);

          if (!isFormValid) {
              event.preventDefault();
              event.stopPropagation();
          }

          form.classList.add('was-validated');
      }, false);
  });
})();

// //********************************************************************** stop autocompelete ********************************************************************************** */

document.querySelectorAll('input, select, textarea').forEach(el => {
  el.setAttribute('autocomplete', 'off');
});


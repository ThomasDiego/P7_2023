document.querySelectorAll(".filterMenu").forEach(function (el) {
  el.addEventListener("click", function (e) {
    document.querySelectorAll(".filterContent").forEach(function (el) {
      el.style.display = "none";
    });

    document.querySelectorAll(".filterMenu").forEach(function (el) {
      el.style.display = "block";
    });

    e.target.style.display = "none";

    document
      .querySelectorAll('.filterContent[data-id="' + e.target.dataset.id + '"]')
      .forEach(function (el) {
        el.style.display = "block";
        filterInput();
      });
  });
});

document.addEventListener("click", function (e) {
  var count = 0;
  document.querySelectorAll(".filterContent").forEach(function (el) {
    if (el.style.display == "block") {
      count++;
    }
  });

  if (
    !e.target.closest(".filterContent") &&
    !e.target.closest(".filterMenu") &&
    count == 1
  ) {
    document.querySelectorAll(".filterContent").forEach(function (el) {
      el.style.display = "none";
    });

    document.querySelectorAll(".filterMenu").forEach(function (el) {
      el.style.display = "block";
    });
  }
});

function filterInput() {
  document.querySelectorAll(".filterInput").forEach((el) => {
    el.addEventListener("keyup", (e) => {
      document.querySelectorAll(".filterList").forEach((el) => {
        console.log("ok1");
        el.querySelectorAll(".filterName").forEach((el) => {
          if (
            el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            el.style.display = "block";
          } else {
            el.style.display = "none";
          }
        });
      });
    });
  });
}

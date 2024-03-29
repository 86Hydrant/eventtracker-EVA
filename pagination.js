function Pagination() {
  var current_page = 1;
  var records_per_page = 3;

  var objJson = //The array, response.events or array.object or band-item.........

  function prevPage() //for prev button
  {
      if (current_page > 1) {
          current_page--;
          changePage(current_page);
      }
  }

  function nextPage() // for next button
  {
      if (current_page < numPages()) {
          current_page++;
          changePage(current_page);
      }
  }

  function changePage(page)
  {
      var btn_next = document.getElementById("btn_next");
      var btn_prev = document.getElementById("btn_prev");
      var listing_table = document.getElementById("listingTable");
      var page_span = document.getElementById("page");

      // Validate page
      if (page < 1) page = 1;
      if (page > numPages()) page = numPages();

      listing_table.innerHTML = "";

      for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
          listing_table.innerHTML += objJson[i].adName + "<br>"; //need to integrate with our print function? or put our print function in here?
      }
      page_span.innerHTML = page + "/" + numPages();

      if (page == 1) {
          btn_prev.style.visibility = "hidden";
      } else {
          btn_prev.style.visibility = "visible";
      }

      if (page == numPages()) {
          btn_next.style.visibility = "hidden";
      } else {
          btn_next.style.visibility = "visible";
      }
  }

  function numPages() //calculating how many pages there will be in total
  {
      return Math.ceil(objJson.length / records_per_page);
  }

  window.onload = function() {
      changePage(1);
  };

}

export default Pagination;

document.addEventListener('DOMContentLoaded', function() {
  // Get all tab links and tab content
  var tabLinks = document.querySelectorAll('nav a');
  var tabContents = document.querySelectorAll('.tab-content');

  // Add event listeners to the tab links
  tabLinks.forEach(function(tabLink) {
    tabLink.addEventListener('click', function(event) {
      event.preventDefault();

      // Remove active class from all tab links and tab contents
      tabLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      tabContents.forEach(function(content) {
        content.classList.remove('active');
      });

      // Add active class to the clicked tab link and corresponding tab content
      var target = this.getAttribute('href');
      this.classList.add('active');
      document.querySelector(target).classList.add('active');
    });
  });

  // Restaurant Search
  var searchForm = document.getElementById('searchForm');
  var searchInput = document.getElementById('searchInput');
  var restaurantList = document.getElementById('restaurantList');

  // Restaurant Data Array
  var restaurants = [
    { name: 'Restaurant 1', zipCode: '12345', address: '123 Main St' },
    { name: 'Restaurant 2', zipCode: '23456', address: '456 Elm St' },
    { name: 'Restaurant 3', zipCode: '34567', address: '789 Oak St' },
    // Add more restaurants as needed
  ];

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var searchTerm = searchInput.value.trim().toLowerCase();

    // Clear previous search results
    restaurantList.innerHTML = '';

    // Perform search based on the searchTerm
    if (searchTerm !== '') {
      var foundRestaurants = restaurants.filter(function(restaurant) {
        return restaurant.zipCode === searchTerm;
      });

      if (foundRestaurants.length > 0) {
        foundRestaurants.forEach(function(restaurant) {
          // Create a list item for each matching restaurant
          var listItem = document.createElement('li');
          var nameElement = document.createElement('h3');
          var addressElement = document.createElement('p');

          nameElement.textContent = restaurant.name;
          addressElement.textContent = restaurant.address;

          listItem.appendChild(nameElement);
          listItem.appendChild(addressElement);

          // Append the list item to the restaurant list
          restaurantList.appendChild(listItem);
        });
      } else {
        // No matching restaurants found
        var listItem = document.createElement('li');
        listItem.textContent = 'No restaurants found';
        restaurantList.appendChild(listItem);
      }
    } else {
      // Empty search term
      var listItem = document.createElement('li');
      listItem.textContent = 'Enter a valid ZIP code';
      restaurantList.appendChild(listItem);
    }
  });
});

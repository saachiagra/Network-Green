var foodRequests = [];
var restDisplay = [];
document.addEventListener('DOMContentLoaded', function () {
  // Get user's location and update the map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap, handleLocationError);
  }

  function showMap(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var mapFrame = document.getElementById('mapFrame');
    var mapSrc = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDp2sWaBCBVR0P3katwTumON1JbB5Iw1aA&q=restaurants+' + latitude + ',' + longitude;
    mapFrame.src = mapSrc;
  }
      
  function showMap(searchQuery) {
    var mapFrame = document.getElementById('mapFrame');
    var mapSrc = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDp2sWaBCBVR0P3katwTumON1JbB5Iw1aA&q=restaurants+' + searchQuery;
    mapFrame.src = mapSrc;
  }
  
  function displayFoodRequests() {
    var requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '';

    foodRequests.forEach(function (request) {
      var listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${request.requesterName}</strong> (${request.requesterEmail})<br>
        Requesting food from <strong>${request.restaurantName}</strong> (${request.restaurantAddress})<br>
        Location: ${request.locationName} (${request.locationAddress})<br>
        Amount of food needed: ${request.foodAmount}<br>
        <em>${request.timestamp}</em>
      `;
      requestsList.appendChild(listItem);
    });

    //for demo page
    var restRequestsList = document.getElementById('getRequests');
    restRequestsList.innerHTML = '';
    restDisplay.forEach(function (request) {
      if (request.restaurantName == "Roaring Fork") {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${request.requesterName}</strong> (${request.requesterEmail})<br>
          Requesting food from <strong>${request.restaurantName}</strong> (${request.restaurantAddress})<br>
          Location: ${request.locationName} (${request.locationAddress})<br>
          Amount of food needed: ${request.foodAmount}<br>
          <em>${request.timestamp}</em>
        `;
        restRequestsList.appendChild(listItem);
      }
    });
  }

      

  function handleLocationError(error) {
    // Handle errors if geolocation fails
    console.error('Error getting user location:', error);
  }

  // Get all tab links and tab content
  var tabLinks = document.querySelectorAll('nav a');
  var tabContents = document.querySelectorAll('.tab-content');

  // Add event listeners to the tab links
  tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener('click', function (event) {
      event.preventDefault();

      // Remove active class from all tab links and tab contents
      tabLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      tabContents.forEach(function (content) {
        content.classList.remove('active');
      });

      // Add active class to the clicked tab link and corresponding tab content
      var target = this.getAttribute('href');
      this.classList.add('active');
      document.querySelector(target).classList.add('active');
    });
  });

  // Restaurant search functionality
  var restaurants = [
    { name: "Corner Restaurant", zipCode: "78701", address: "110 E 2nd St, Austin, TX 78701" },
    { name: "North Italia", zipCode: "78701", address: "500 W 2nd St #120, Austin, TX 78701" },
    { name: "Red Ash", zipCode: "78701", address: "500 W Colorado Tower, 303 Colorado St #200, Austin, TX 78701" },
    { name: "Roaring Fork", zipCode: "78701", address: "701 Congress Ave., Austin, TX 78701" },
    { name: "Lou's Eastside", zipCode: "78702", address: "1900 E Cesar Chavez St, Austin, TX 78702" },
    { name: "Revelry Kitchen + Bar", zipCode: "78702", address: "1410 E 6th St, Austin, TX 78702" },
    { name: "Birdie's", zipCode: "78702", address: "2944 E 12th St Unit A, Austin, TX 78702" },
    { name: "Casa Colombia", zipCode: "78702", address: "2409 E 7th St, Austin, TX 78702" },
    { name: "Onion Creek Grille", zipCode: "78744", address: "4140 Governors Row, Austin, TX 78744" },
    { name: "Hideaway Kitchen & Bar", zipCode: "78744", address: "4323 N Interstate 35 Frontage Rd, Austin, TX 78744" },
    { name: "Distant Relatives", zipCode: "78744", address: "3901 Promontory Point Dr, Austin, TX 78744" },
    { name: "Loro", zipCode: "78704", address: "2115 S Lamar Blvd, Austin, TX 78704" },
    { name: "Hunan Ranch", zipCode: "78717", address: "14900 Avery Ranch Blvd ste c300, Austin, TX 78717" },
    { name: "Twin Panda", zipCode: "78717", address: "9231 W Parmer Ln UNIT 101, Austin, TX 78717" },
    { name: "Tony C's", zipCode: "78717", address: "10526 W Parmer Ln, Austin, TX 78717" },
    { name: "The League Kitchen & Tavern", zipcode: "78717", address: "10526 W Parmer Ln, Austin, TX 78717"},
    { name: "Mandola's Italian Kitchen", zipCode: "78613", address: "12100 W Parmer Ln #200, Cedar Park, TX 78613" },
    { name: "Las Palomas Restaurant & Bar", zipCode: "78746", address: "3201 Bee Caves Rd Ste 122, Austin, TX 78746" },
    { name: "Steiner Ranch Steakhouse", zipCode: "78732", address: "5424 Steiner Ranch Blvd, Austin, TX 78732" },
    { name: "Midori Sushi Austin", zipCode: "78750", address: "13435 N Hwy 183 #301, Austin, TX 78750" },
    { name: "Interstellar BBQ", zipCode: "78750", address: "12233 Ranch Rd 620 N suite 105, Austin, TX 78750" },
    { name: "Sip Saam Thai", zipCode: "78729", address: "6301 W Parmer Ln, Austin, TX 78729" },
    { name: "Halal Bros - Anderson Mill", zipCode: "78726", address: "11521 N FM 620 Suite 1300 Austin TX 78726" },
    { name: "Terry Black's Barbecue", zipCode: "78704", address: "1003 Barton Springs Rd, Austin, TX 78704" },
    { name: "Trudy's Texas Star", zipCode: "78705", address: "409 W 30th St, Austin, TX 78705" },
    { name: "Franklin Barbecue", zipCode: "78702", address: "900 E 11th St, Austin, TX 78702" },
    { name: "Uchi", zipCode: "78704", address: "801 S Lamar Blvd, Austin, TX 78704" },
    { name: "De Nada Tacos", zipCode: "78719", address: "South Terminal, 10000 Logistics Ln, Austin, TX 78719" },
    { name: "Taco Cabana", zipCode: "78712", address: "2201 Speedway, Austin, TX 78712" },
    { name: "Shuck Me", zipCode: "78730", address: "10817 Ranch Rd 2222, Austin, TX 78730" },
    { name: "Jason's Deli", zipCode: "78734", address: "1504 Ranch Rd 620 S, Lakeway, TX 78734" },
    { name: "Jack Allen's Kitchen Oak Hill", zipCode: "78735", address: "7720 State Hwy 71 West, Austin, TX 78735" },
    { name: "Stonys Pizza Oak Hill", zipCode: "78736", address: "9521 US-290, Austin, TX 78736" },
  ];



  var searchForm = document.getElementById('searchForm');
  var searchResults = document.getElementById('searchResults');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous search results
    searchResults.innerHTML = '';

    // Get the search query
    var searchQuery = document.getElementById('searchQuery').value;

    // Call the showMap function with the search query
    showMap(searchQuery);


    // Perform search
    var matchingRestaurants = restaurants.filter(function (restaurant) {
      return restaurant.zipCode === searchQuery;
    });

        // Display search results
    if (matchingRestaurants.length > 0) {
      matchingRestaurants.forEach(function (restaurant) {
        var listItem = document.createElement('li');
        var restaurantName = document.createElement('span');
        var restaurantAddress = document.createElement('span');
        var requestButton = document.createElement('button');

        restaurantName.textContent = restaurant.name;
        restaurantAddress.textContent = restaurant.address;
        requestButton.textContent = 'Request Food';
        requestButton.className = 'request-button';

        listItem.appendChild(restaurantName);
        listItem.appendChild(restaurantAddress);
        listItem.appendChild(requestButton);

        searchResults.appendChild(listItem);
      });
    } else {
      var listItem = document.createElement('li');
      listItem.textContent = 'No restaurants found for the provided zip code.';
      searchResults.appendChild(listItem);
    }
  });


  // Request food functionality
  searchResults.addEventListener('click', function (event) {
    if (event.target.classList.contains('request-button')) {
      var restaurantName = event.target.parentNode.querySelector('span:first-child').textContent;
      var restaurantAddress = event.target.parentNode.querySelector('span:nth-child(2)').textContent;

      // Prompt user for information
      var nameOfLocation = prompt('Name of Location being requested for food:');
      var addressOfLocation = prompt('Address of location:');
      var yourName = prompt('Your name:');
      var yourEmail = prompt('Your email:');
      var amountOfFoodNeeded = prompt('Amount of food needed:');

      // Perform the request action (replace with your desired logic)
      alert('Requesting food from ' + restaurantName + restaurantAddress +
        '\n\nRequest Details:' +
        '\nName of Location: ' + nameOfLocation +
        '\nAddress of Location: ' + addressOfLocation +
        '\nYour Name: ' + yourName +
        '\nYour Email: ' + yourEmail +
        '\nAmount of Food Needed: ' + amountOfFoodNeeded);
      // Create a new food request object
      var foodRequest = {
        restaurantName: restaurantName,
        restaurantAddress: restaurantAddress,
        locationName: nameOfLocation,
        locationAddress: addressOfLocation,
        requesterName: yourName,
        requesterEmail: yourEmail,
        foodAmount: amountOfFoodNeeded,
        timestamp: new Date().toLocaleString() // Add timestamp
      };

      // Add the food request to the foodRequests array
      foodRequests.push(foodRequest);
      restDisplay.push(foodRequest);
      displayFoodRequests();

    }
  });

});

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the form values using destructuring assignment
  const { donorName, donorEmail, foodDescription } = event.target.elements;

  // Validate form fields (optional)
  if (!donorName.value || !donorEmail.value || !foodDescription.value) {
    alert('Please fill in all fields.');
    return;
  }

  // Create a new donation object
  const donation = {
    donorName: donorName.value,
    donorEmail: donorEmail.value,
    foodDescription: foodDescription.value,
    timestamp: new Date().toLocaleString() // Add timestamp
  };

  // Clear the form inputs
  donorName.value = '';
  donorEmail.value = '';
  foodDescription.value = '';

  // Display the donation in the list
  const donationsList = document.getElementById('donations');
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <strong>${donation.donorName}</strong> (${donation.donorEmail})<br>
    ${donation.foodDescription}<br>
    <em>${donation.timestamp}</em>
  `;
  donationsList.prepend(listItem);

  // Provide feedback to the user (optional)
  alert('Thank you for your donation!');
}

// Add event listener to the form
const donationForm = document.getElementById('donationForm');
donationForm.addEventListener('submit', handleSubmit);


function register(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById("usernamereg").value;
  var password = document.getElementById("password").value;

}

//confirming passwords verification
function checkPasswordMatch(confirmPasswordInput) {
  var passwordInput = document.getElementById("password");

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords do not match");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
}

/*function demoPage(form) {
  if (form.username.value == "pizzahut") {
    window.location = "https://www.geeksforgeeks.org/";
  }
}

let demoForm = document.getElementById("demoLogin");

demoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("demoUser");
  let password = document.getElementById("demoPass");

  if (username.value == "pizzahut" || password.value == "cheese") {
    alert("yayay");
  } 
}); */

document.getElementById("demoLogin").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get the values of the username and password fields
  var username = document.getElementById("demoUser").value;
  var password = document.getElementById("demoPass").value;
  if (username == "pizzahut" || password == "cheese") {
    //alert("yayayay");
    // Redirect to a different page with parameters
    window.location.href = "dashboard.html";
  }

  
});


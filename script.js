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

//confirming passwords verification
function validatePassword(){
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm_password").value;

  if (password == confirm_password) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword();
confirm_password.onkeyup = validatePassword();

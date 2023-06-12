// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
  
    // Get the form values
    const donorName = document.getElementById('donorName').value;
    const donorEmail = document.getElementById('donorEmail').value;
    const foodDescription = document.getElementById('foodDescription').value;
  
    // Create a new donation object
    const donation = {
      donorName,
      donorEmail,
      foodDescription,
      timestamp: new Date().toLocaleString() // Add timestamp
    };
  
    // Clear the form inputs
    document.getElementById('donorName').value = '';
    document.getElementById('donorEmail').value = '';
    document.getElementById('foodDescription').value = '';
  
    // Display the donation in the list
    const donationsList = document.getElementById('donations');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${donation.donorName}</strong> (${donation.donorEmail})<br>
      ${donation.foodDescription}<br>
      <em>${donation.timestamp}</em>
    `;
    donationsList.prepend(listItem);
  }
  
  // Add event listener to the form
  const donationForm = document.getElementById('donationForm');
  donationForm.addEventListener('submit', handleSubmit);
  
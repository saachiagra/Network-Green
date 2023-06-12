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
});

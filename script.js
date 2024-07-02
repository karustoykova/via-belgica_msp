document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll("#image-carousel img");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentImageIndex = 0;
  const intervalTime = 5000; // Interval time in milliseconds (5 seconds)

  // Function to show the current image and hide others
  function showImage(index) {
      images.forEach((img, idx) => {
          if (idx === index) {
              img.classList.add("active");
          } else {
              img.classList.remove("active");
          }
      });
  }

  // Function to show the next image
  function nextImage() {
      currentImageIndex++;
      if (currentImageIndex >= images.length) {
          currentImageIndex = 0; // Restart from the first image
      }
      showImage(currentImageIndex);
  }

  // Function to show the previous image
  function prevImage() {
      currentImageIndex--;
      if (currentImageIndex < 0) {
          currentImageIndex = images.length - 1; // Go to the last image
      }
      showImage(currentImageIndex);
  }

  // Event listeners for next and previous buttons
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);

  // Initial show of the first image
  showImage(currentImageIndex);

  // Automatic image change every intervalTime milliseconds
  setInterval(nextImage, intervalTime);
});
  // PDF viewer
let currentPDFId = null;

function openPDF(pdfId) {
  // gest the selected pdf
  var selectedPDF = document.getElementById(pdfId);
  
  // toggle the visiblity if the same pdf is clicked again
  if (currentPDFId === pdfId) {
    if (selectedPDF.style.display === 'block') {
      selectedPDF.style.display = 'none';
      currentPDFId = null;
    } else {
      selectedPDF.style.display = 'block';
    }
  } else {
    // hides all pdfs
    var pdfPages = document.querySelectorAll('.pdf-page');
    pdfPages.forEach(page => {
      page.style.display = 'none';
    });
    
    // shows the clicked pdf
    if (selectedPDF) {
      selectedPDF.style.display = 'block';
      currentPDFId = pdfId;
    }
  }

  // scrolls to the top
  var pdfContainer = document.getElementById('pdfContainer');
  if (pdfContainer && currentPDFId) {
    pdfContainer.scrollTop = 0;
  }
}

// Map stuff
// Initialize Leaflet map
document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map').setView([50.8514, 5.6909], 8); // Centered around Maastricht, lower zoom level

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Define custom icon for general locations
  var customIcon = L.icon({
      iconUrl: '/via-belgica_msp/icons/icons8-map-pin-48.png', // Ensure this path is correct
      iconSize: [30, 30], // Size of the icon
      iconAnchor: [15, 30], // Adjusted to [15, 30] for better positioning
      popupAnchor: [0, -30] // Adjusted to [0, -30] for better popup positioning
  });

  // Define custom icon for reviews
  var reviewIcon = L.icon({
      iconUrl: '/via-belgica_msp/icons/icons8-review-40.png', // Ensure this path is correct
      iconSize: [25, 25], // Size of the icon
      iconAnchor: [15, 30], // Adjusted to [15, 30] for better positioning
      popupAnchor: [0, -30] // Adjusted to [0, -30] for better popup positioning
  });

  // Marker locations and titles
  var markers = [
      { location: [50.7804, 5.4646], title: 'Tongeren', icon: customIcon },
      { location: [50.8514, 5.6909], title: 'Maastricht', icon: customIcon },
      { location: [50.8878, 5.9795], title: 'Heerlen', icon: customIcon },
      { location: [50.932, 6.3595], title: 'Jülich', icon: customIcon },
      { location: [50.6938, 5.2545], title: 'Waremme', icon: customIcon },
      { location: [50.897038, 6.280420], title: '<b>Linn</b>: ⭐⭐⭐⭐ Me and my group went on this walk on a beautiful sunny day in June, and it was lovely. We started early in Heerlen and got ready to enjoy the beautiful day. The first part of the walk was through the city, but as soon as we got out of it, the scenery gave way to large fields, occasionally passing through cute little towns. The weather was beautiful and allowed us to catch a tan while also enjoying a brisk walk, though it is important to bring lots of water and sun cream! After about 6 hours of walking, we reached the city of Aldenhoven, where the walk had to come to an end for us.', icon: reviewIcon },
      { location: [50.9093, 6.1883], title: '<b>Ethan:</b> ⭐⭐⭐ It was a pleasant walk accessible for people of all ages with its minimal incline. You can also stop to rest along charming small cities on the way. This was a lovely walk to do in summer when the flowers and gardens are all in bloom. I would recommend choosing a day that is not too warm.', icon: reviewIcon } // Baesweiler with review
  ];

  // Add markers to the map
  markers.forEach(function (marker) {
      L.marker(marker.location, { icon: marker.icon }).addTo(map)
          .bindPopup(marker.title); // Add a popup with the location title or review
  });

  // Check console for errors
  console.log('Map and markers initialized successfully.');
});
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

  // Define custom icon
  var customIcon = L.icon({
      iconUrl: '/icons/icons8-map-pin-48.png',
      iconSize: [30, 30], // Size of the icon
      iconAnchor: [24, 48], // Point of the icon which corresponds to marker's location
      popupAnchor: [0, -48] // Point from which the popup should open relative to the iconAnchor
  });

  // Marker locations and titles
  var markers = [
      { location: [50.7804, 5.4646], title: 'Tongeren' },
      { location: [50.8514, 5.6909], title: 'Maastricht' },
      { location: [50.8878, 5.9795], title: 'Heerlen' },
      { location: [50.932, 6.3595], title: 'Jülich' }
  ];

  // Add markers to the map
  markers.forEach(function (marker) {
      L.marker(marker.location, { icon: customIcon }).addTo(map)
          .bindPopup(marker.title); // Add a popup with the location title
  });

  // Check console for errors
  console.log('Map and markers initialized successfully.');
});
---
hide:
  - navigation
  - toc
---

<div class="banner">
  <img src="images/Jacobo_drone.mp4" alt="" />
  <div class="banner-text">
    <h1><b>Rhett M. Rautsaw</b></h1>
    <p>Senior Scientist, Field Applications Bioinformatic Support, PacBio <br> Bioinformatics | Genomics | Evolution | Ecology | Conservation</p>
  </div>
</div>

<br> 

<img src="images/RhettRautsaw1.jpg" alt="Rhett Rautsaw" class="profile-pic" align="left" />

# Welcome. My name is Rhett Rautsaw. 

I am currently a senior bioinformatic support scientist at Pacific Biosciences. I have more than <span id="years"></span> years of experience in genomics, bioinformatics, statistics, scripting, pipeline/application development, data analysis, and scientific communication. I am primarily interested in finding ways to transform complex multiomic data (i.e., genomic, transcriptomic, epigenomic) into usable information that advance our understanding of biology.

In my current position, my role is to:

1. Educate scientists on the benefits of HiFi long-read sequencing across a variety of applications.
2. Provide hands-on bioinformatic support and training for scientists using PacBio sequencing technologies.
3. Assist scientists in managing and analyzing data using the latest bioinformatic tools and pipelines.
4. Provide feedback to help develop and improve bioinformatic tools and pipelines.

## Academic Background

![Academic Interests](images/logos/academic_interests_light.png#only-light){ width=50%, align="right" }
![Academic Interests](images/logos/academic_interests_dark.png#only-dark){ width=50%, align="right"}

My research focuses on the integration of genomics, evolution, ecology, and conservation biology to study molecular ecology and eco-immunology through the lens of species interactions in two systems:

1. Snake Speciation & Venom Evolution
2. Tasmanian Devils & Transmissible Cancer

My overarching research agenda aims to answer how species interactions influence evolution at different spatial, taxonomic, and temporal scales as well as across different levels of biological organization from genomes to communities. 
​

Learn more on my [Research](research/index.md) page.

## Career Timeline

::gantt::whole-years no-quarters no-weeks month-width=5

- title: Milestones
  events:
  - title: Wright State University
    time: 2012-08-01
    icon: "images/logos/WrightStateUniv2.png"
  - title: University of Central Florida
    time: 2014-08-01
    icon: "images/logos/UCF.png"
  - title: Clemson University
    time: 2017-08-01
    icon: "images/logos/Clemson.png"
  - title: University of South Florida
    time: 2022-07-01
    icon: "images/logos/WSU.png"
  - title: Pacific Biosciences
    time: 2023-05-01
    icon: "images/logos/PacBio.png"

- title: B.S.
  activities:
    - title: Wright State University
      start: 2012-08-01
      end: 2014-05-12
- title: M.S.
  activities:
    - title: University of Central Florida
      start: 2014-07-01
      end: 2017-05-12
- title: Ph.D.
  activities:
    - title: Clemson University
      start: 2017-08-01
      end: 2022-08-01
- title: PostDoc
  activities:
    - title: Washington State University
      start: 2022-07-01
      end: 2023-05-01
    - title: University of South Florida
      start: 2022-07-01
      end: 2023-05-01

- title: PacBio
  activities:
    - title: Scientist II, FABS
      start: 2023-05-01
      end: 2025-02-01
    - title: Senior Scientist, FABS
      start: 2025-02-01
      end: 2027-01-01

::/gantt::

<br>

## Who am I outside of work?

I am a field biologist at heart, so it should be no surprise to know that I spend a lot of my free time outdoors. I enjoy hiking, kayaking, camping, biking, (amateur) wildlife photography, and (of course) looking for snakes. I also enjoy soccer, both playing and watching – particularly the World Cup. When I'm not outside, I enjoy playing video games (e.g., Legend of Zelda) as well as rewatching my favorite TV shows (e.g., How I Met Your Mother) and movies (e.g., Star Wars and Harry Potter) over and over again. 

<div class="grid masonry-gallery">
  <a href="images/RhettRautsaw2.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw2.jpg" alt=""> </a>
  <a href="images/RhettRautsaw3.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw3.jpg" alt=""> </a>
  <a href="images/RhettRautsaw4.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw4.jpg" alt=""> </a>
  <a href="images/RhettRautsaw5.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw5.jpg" alt=""> </a>
  <a href="images/RhettRautsaw6.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw6.jpg" alt=""> </a>
  <a href="images/RhettRautsaw7.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw7.jpg" alt=""> </a>
  <a href="images/RhettRautsaw8.jpg" class="grid-item glightbox"> <img src="images/RhettRautsaw8.jpg" alt=""> </a>
</div>


### Travel

I also enjoy traveling – and although I would like to do it more often – I have been fortunate enough to visit some incredible places. Check out the map of places I've traveled below. 

<!-- Add this wherever you want the map to appear -->
<div id="travel-map-wrapper" class="travel-map-wrapper">
  <button id="map-fullscreen-button" class="map-fullscreen-button" type="button" aria-label="Expand map to full screen">Full screen</button>
  <div id="map" class="travel-map"></div>
</div>

<!-- Leaflet CSS & JS -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function () {

  // ---- Initialize Map ----
  const map = L.map("map", {
    layers: []
  }).setView([0, 0], 2);

  const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  });

  const satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri"
  });

  streetLayer.addTo(map);

  L.control.layers({
    "Streets": streetLayer,
    "Satellite": satelliteLayer
  }, null, {
    collapsed: false
  }).addTo(map);

  const mapWrapper = document.getElementById("travel-map-wrapper");
  const fullscreenButton = document.getElementById("map-fullscreen-button");

  function refreshMapSize() {
    setTimeout(() => map.invalidateSize(), 100);
  }

  fullscreenButton.addEventListener("click", function () {
    if (document.fullscreenElement === mapWrapper) {
      document.exitFullscreen();
    } else if (mapWrapper.requestFullscreen) {
      mapWrapper.requestFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function () {
    const isFullscreen = document.fullscreenElement === mapWrapper;
    fullscreenButton.textContent = isFullscreen ? "Exit full screen" : "Full screen";
    refreshMapSize();
  });

  function parseCsv(csvText) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && nextChar === "\n") i++;
        row.push(field);
        if (row.some(value => value.trim() !== "")) rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    row.push(field);
    if (row.some(value => value.trim() !== "")) rows.push(row);

    const headers = rows.shift().map(header => header.trim());
    return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function addPoint(row) {
    const popupTitle = row.group || row.name;
    const popupRows = [
      row.group ? `<b>Site:</b> ${escapeHtml(row.name)}` : "",
      row.year ? `<b>Year:</b> ${escapeHtml(row.year)}` : "",
      row.purpose ? `<b>Purpose:</b> ${escapeHtml(row.purpose)}` : "",
      row.notes ? `<b>Notes:</b> ${escapeHtml(row.notes)}` : ""
    ].filter(Boolean).join("<br>");

    const popupContent = `
      <div style="font-size:14px;">
        <b>${escapeHtml(popupTitle)}</b>${popupRows ? "<br>" + popupRows : ""}
      </div>
    `;

    L.circleMarker([row.lat, row.lng], {
      radius: 6,
      color: "#b30000",
      weight: 2,
      fillColor: "#e31a1c",
      fillOpacity: 0.9
    }).addTo(map).bindPopup(popupContent);
  }

  fetch("travel_points.csv")
    .then(response => {
      if (!response.ok) throw new Error("Travel CSV could not be loaded.");
      return response.text();
    })
    .then(csvText => {
      const rows = parseCsv(csvText)
        .map(row => ({
          ...row,
          lat: Number(row.lat),
          lng: Number(row.lng),
          order: row.order === "" ? null : Number(row.order)
        }))
        .filter(row => Number.isFinite(row.lat) && Number.isFinite(row.lng));

      const groupedRows = new Map();

      rows.forEach(row => {
        addPoint(row);
        if (!row.group) return;
        if (!groupedRows.has(row.group)) groupedRows.set(row.group, []);
        groupedRows.get(row.group).push(row);
      });

      groupedRows.forEach(groupRows => {
        const latlngs = groupRows
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(row => [row.lat, row.lng]);

        if (latlngs.length > 1) {
          L.polyline(latlngs, { color: "#e31a1c", weight: 3, opacity: 0.75 }).addTo(map);
        }
      });
    })
    .catch(error => {
      document.getElementById("map").innerHTML = `<p style="padding:1rem;">${escapeHtml(error.message)}</p>`;
      console.error(error);
    });

});
</script>






<!-- Additional functions -->
<script>
  const startYear = 2015; // year you started
  document.getElementById("years").textContent = new Date().getFullYear() - startYear;
</script>

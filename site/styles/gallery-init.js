document.addEventListener("DOMContentLoaded", function () {
  // Masonry part (optional)
  const grid = document.querySelector(".masonry-gallery");
  if (grid && typeof Masonry !== "undefined" && typeof imagesLoaded !== "undefined") {
    const msnry = new Masonry(grid, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-item",
      percentPosition: true,
      gutter: 10,
    });

    imagesLoaded(grid, () => msnry.layout());
  }

  // GLightbox part (same as before)
  if (typeof GLightbox === "function") {
    GLightbox({ selector: ".glightbox" });
  }
});


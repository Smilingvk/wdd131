const temples = [
    {
      templeName: "San Diego California",
      location: "San Diego, California, USA",
      dedicated: "1993, April, 25",
      area: 72000,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg",
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, USA",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
    },
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-38451-main.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg"
    },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, Sap Paulo, Brazil",
        dedicated: "2002, May, 17",
        area: 4469,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6012-main.jpg"
    }
  ];
  
  function displayTemples(filteredTemples) {
    const container = document.getElementById("temples");
    container.innerHTML = "";
    filteredTemples.forEach(t => {
      const card = document.createElement("section");
      card.classList.add("temple-card");
      card.innerHTML = `
        <h2>${t.templeName}</h2>
        <p><strong>Location:</strong> ${t.location}</p>
        <p><strong>Dedicated:</strong> ${t.dedicated}</p>
        <p><strong>Size:</strong> ${t.area} sq ft</p>
        <img loading="lazy" src="${t.imageUrl}" alt="${t.name}">
      `;
      container.appendChild(card);
    });
  }

  function filterTemples(criteria) {
    let filtered = [];
    if (criteria === "old") {
      filtered = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
    } else if (criteria === "new") {
      filtered = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
    } else if (criteria === "large") {
      filtered = temples.filter(t => t.area > 90000);
    } else if (criteria === "small") {
      filtered = temples.filter(t => t.area < 10000);
    } else {
      filtered = temples;
    }
    displayTemples(filtered);
  }

  document.addEventListener("DOMContentLoaded", () => {
    filterTemples('all');
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  });
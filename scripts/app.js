document.addEventListener("DOMContentLoaded", () => {
  console.log("Seite geladen. JavaScript wird ausgeführt...");

  const tableBody = document.querySelector("#emissions-table tbody");
  const filterInput = document.querySelector("#filter-input");
  const sortCountryButton = document.querySelector("#sort-country");
  const sortCompanyButton = document.querySelector("#sort-company");

  if (!tableBody || !filterInput || !sortCountryButton || !sortCompanyButton) {
    console.error("Elemente für Tabelle, Filter oder Sortier-Buttons nicht gefunden!");
    return;
  }

  fetch("data/emissions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderTable(data);

      // Filter-Eingabe
      filterInput.addEventListener("input", () => {
        const filterValue = filterInput.value.toLowerCase();
        const filteredData = data.filter(
          (item) =>
            item.country.toLowerCase().includes(filterValue) ||
            item.company.toLowerCase().includes(filterValue)
        );
        renderTable(filteredData);
      });

      // Sortieren nach Land
      sortCountryButton.addEventListener("click", () => {
        const sortedData = [...data].sort((a, b) => a.country.localeCompare(b.country));
        renderTable(sortedData);
      });

      // Sortieren nach Unternehmen
      sortCompanyButton.addEventListener("click", () => {
        const sortedData = [...data].sort((a, b) => a.company.localeCompare(b.company));
        renderTable(sortedData);
      });
    })
    .catch((error) => {
      console.error("Fehler beim Laden der Daten:", error.message);
    });

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.classList.add("table-light"); // Bootstrap-Klasse für Tabelle

      row.innerHTML = `
        <td>${sanitizeInput(item.country)}</td>
        <td>${sanitizeInput(item.company)}</td>
        <td>${sanitizeInput(item.emissions)}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Eingabebereinigung
  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.innerText = input;
    return div.innerHTML; // Entfernt gefährliche Zeichen wie <, >, &, "
  }
});

// Formular validieren
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = sanitizeInput(document.getElementById("name").value);
  const email = sanitizeInput(document.getElementById("email").value);
  const message = sanitizeInput(document.getElementById("message").value);

  // Daten sicher weiterverarbeiten
  console.log({ name, email, message });
});

// RTL-Unterstützung für Navigation
document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement;
  const nav = document.querySelector(".global-nav ul");

  if (html.getAttribute("dir") === "rtl") {
    nav.style.flexDirection = "row-reverse"; // Links-nach-Rechts Reihenfolge umkehren
  }
});
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
      row.innerHTML = `
        <td>${item.country}</td>
        <td>${item.company}</td>
        <td>${item.emissions}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});

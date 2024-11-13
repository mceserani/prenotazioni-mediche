const calendar = document.getElementById('calendar');

// Creazione della riga di intestazione con gli orari
const headerRow = document.createElement('tr');

// Cella vuota nell'angolo in alto a sinistra
const emptyHeaderCell = document.createElement('th');
headerRow.appendChild(emptyHeaderCell);

// Creazione delle celle di intestazione per gli orari dalle 9:00 alle 17:00
for (let hour = 9; hour <= 17; hour++) {
    const hourHeaderCell = document.createElement('th');
    hourHeaderCell.textContent = `${hour}:00`;
    headerRow.appendChild(hourHeaderCell);
}
calendar.appendChild(headerRow);

for (let day = 1; day <= 30; day++) {
	let day_row = document.createElement("tr");
	let day_cell = document.createElement("td");
	day_cell.textContent = `${day}-nov`;
	day_row.appendChild(day_cell);
	for (let h = 9; h <= 17; h++) {
		const hour_cell = document.createElement('td');
        const hour_id = `${day}-${h}`;
		if (localStorage.getItem(hour_id) === null)
            hour_cell.classList.add("available");
        else
            hour_cell.classList.add("booked");
        hour_cell.onclick = function() {
            let confirm = false;
            if (hour_cell.classList.contains("available"))
                confirm = window.confirm("Vuoi prenotare questo orario?");
            else
                confirm = window.confirm("Vuoi cancellare la prenotazione?");
            if (hour_cell.classList.contains("available") && confirm) {
                hour_cell.classList.remove("available");
                hour_cell.classList.add("booked");
                // Inserisce nel LocalStorage la prenotazione
                localStorage.setItem(hour_id, "booked");
            } else if (hour_cell.classList.contains("booked") && confirm) {
                hour_cell.classList.remove("booked");
                hour_cell.classList.add("available");
                // Rimuove dal LocalStorage la prenotazione
                localStorage.removeItem(hour_id);
            }
        }
		day_row.appendChild(hour_cell);
	}
    calendar.appendChild(day_row);
} 
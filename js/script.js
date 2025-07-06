document.getElementById("login-form").addEventListener("submit", function (e) {
  
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (email.endsWith("@student.cuet.ac.bd")) {
    window.location.href = "student/student.html";
  } else if (email.endsWith("@cuet.ac.bd")) {
    window.location.href = "admin/admin-dashboard.html";
  } else {
    alert("Invalid email address. Please use a CUET email.");
  }
});

function openModal(e) {
  e.preventDefault();
  document.getElementById("logoutModal").classList.add("active");
}
function closeModal() {
  document.getElementById("logoutModal").classList.remove("active");
}
function handleLogout() {
  localStorage.removeItem("authToken");
  window.location.href = "../index.html"; // redirect to login
}

// Add Meal Function
function addMeal() {
  const date = document.getElementById("meal-date").value;
  const type = document.getElementById("meal-type").value;
  const dish = document.getElementById("meal-dish").value;

  if (!date || !dish) {
    alert("Please fill out all fields.");
    return;
  }

  const row = document.querySelector(`tr[data-date="${date}"]`);
  if (!row) {
    alert("Date not in current week!");
    return;
  }

  const cell = row.querySelector(`.${type}`);
  cell.textContent = dish;
}

// Generate Weekly Table on Load
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const tbody = document.getElementById("meal-body");

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];

    const row = document.createElement("tr");
    row.setAttribute("data-date", dateStr);

    row.innerHTML = `
        <td>${dateStr}</td>
        <td class="lunch">Unplanned</td>
        <td class="dinner">Unplanned</td>
      `;

    tbody.appendChild(row);
  }
});

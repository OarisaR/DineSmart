// ---------- STUDENT MANAGE DATA ----------
const students = [
  {
    id: "2104114", firstName: "Tahmima", middleName: "", lastName: "Eid", dob: "2001-05-14",
    major: "CSE", residenceType: "alloted", roomNumber: "120",
    contactNo: "01700000001", email: "u2104114@cuet.ac.bd"
  },
  {
    id: "2102074", firstName: "Fawzia", middleName: "", lastName: "Maria", dob: "2000-09-21",
    major: "EEE", residenceType: "attached", roomNumber: "-",
    contactNo: "01700000002", email: "u2102074@cuet.ac.bd"
  },
  {
    id: "2104125", firstName: "Dipannita", middleName: "Paul", lastName: "Orni", dob: "2001-10-15",
    major: "CSE", residenceType: "alloted", roomNumber: "213",
    contactNo: "01700000001", email: "u2104125@cuet.ac.bd"
  },
  {
    id: "2104129", firstName: "Oarisa", middleName: "", lastName: "Rebayat", dob: "2001-02-11",
    major: "MME", residenceType: "attached", roomNumber: "-",
    contactNo: "01700000001", email: "u2109129@cuet.ac.bd"
  },
  {
    id: "2104126", firstName: "Sanjida", middleName: "", lastName: "Eva", dob: "2001-05-14",
    major: "CSE", residenceType: "alloted", roomNumber: "501",
    contactNo: "01700000001", email: "u2104126@cuet.ac.bd"
  }
];

const assignableStudents = [
  { studentID: 1904012, name: "Debarati Hoque Chakraborty" },
  { studentID: 1904038, name: "Moumita Barua" },
  { studentID: 2104125, name: "John Doe" },
  { studentID: 2104126, name: "Sanjida Eva" }
];

// ---------- ON LOAD ----------
document.addEventListener("DOMContentLoaded", () => {

  // ---------- STUDENT PAGE ----------
  if (document.getElementById("tableBody")) {
    renderTable();
    document.getElementById("updateForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const id = document.getElementById("editId").value;
      const student = students.find((s) => s.id === id);
      if (!student) return;

      student.firstName = document.getElementById("firstName").value;
      student.middleName = document.getElementById("middleName").value;
      student.lastName = document.getElementById("lastName").value;
      student.contactNo = document.getElementById("contactNo").value;
      student.residenceType = document.getElementById("residenceType").value;
      student.roomNumber = document.getElementById("roomNumber").value;
      student.dob = document.getElementById("dob").value;

      renderTable();
      document.getElementById("editForm").style.display = "none";
    });

    document.getElementById("searchInput").addEventListener("input", function () {
      const value = this.value.toLowerCase();
      document.querySelectorAll("#tableBody tr").forEach((row) => {
        row.style.display = row.cells[0].textContent.toLowerCase().includes(value) ? "" : "none";
      });
    });
  }

  // ---------- DINING MANAGER ----------
  const dmName = document.getElementById("dm-name");
  const dmEmail = document.getElementById("dm-email");
  const dmBudget = document.getElementById("dm-budget");
  const dmDuration = document.getElementById("dm-duration");
  const assignList = document.getElementById("assignList");
  const dmSearch = document.getElementById("dmSearch");
  const pieCtx = document.getElementById("performanceChart");

  if (dmName && pieCtx) {
    dmName.textContent = "Debarati Hoque Chakraborty";
    dmEmail.textContent = "u1904038@student.cuet.ac.bd";
    dmBudget.textContent = "70000";
    dmDuration.textContent = "1 month";

    new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Food Waste", "Meal Redemption Rate", "Meal Cost Efficiency"],
        datasets: [{
          data: [5, 60, 35],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    function renderAssignables(filter = "") {
      if (!assignList) return;
      assignList.innerHTML = "";
      assignableStudents
        .filter(s => s.studentID.toString().includes(filter))
        .forEach(s => {
          const div = document.createElement("div");
          div.className = "assign-item";
          div.innerHTML = `<span>(ID: ${s.studentID}) ${s.name}</span>
                           <button onclick="assignManager(${s.studentID})">Assign</button>`;
          assignList.appendChild(div);
        });
    }

    if (dmSearch) {
      dmSearch.addEventListener("input", () => {
        renderAssignables(dmSearch.value.trim());
      });
    }

    renderAssignables();
  }

  // ---------- CHARTS FOR DASHBOARD ----------
  const lineCanvas = document.getElementById("lineChart");
  const donutCanvas = document.getElementById("donutChart");
  const barCanvas = document.getElementById("barChart");

  if (lineCanvas) {
    new Chart(lineCanvas, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Meals This Week",
          data: [200, 300, 250, 400, 320, 450, 500],
          borderColor: "#2F8C85",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  if (donutCanvas) {
    new Chart(donutCanvas, {
      type: "doughnut",
      data: {
        labels: ["Active Users", "Non-active Users"],
        datasets: [{
          data: [321, 150],
          backgroundColor: ["#2F8C85", "#FF6384"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  if (barCanvas) {
    new Chart(barCanvas, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          label: "Meals Redeemed",
          data: [1200, 1900, 3000, 2500, 2200, 3200, 2900],
          backgroundColor: "#2F8C85"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});

// GLOBAL
function assignManager(id) {
  alert(`Student with ID ${id} has been assigned as Dining Manager!`);
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  students.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.firstName} ${s.middleName} ${s.lastName}</td>
      <td>${s.dob}</td>
      <td>${s.major}</td>
      <td>${s.residenceType}</td>
      <td>${s.roomNumber}</td>
      <td>${s.contactNo}</td>
      <td>${s.email}</td>
      <td>
        <button class="action-button edit" onclick="editStudent('${s.id}')">Edit</button>
        <button class="action-button delete" onclick="deleteStudent('${s.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  document.getElementById("editForm").style.display = "block";
  document.getElementById("editId").value = student.id;
  document.getElementById("firstName").value = student.firstName;
  document.getElementById("middleName").value = student.middleName;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("contactNo").value = student.contactNo;
  document.getElementById("residenceType").value = student.residenceType;
  document.getElementById("roomNumber").value = student.roomNumber;
  document.getElementById("dob").value = student.dob;
}

function deleteStudent(id) {
  const index = students.findIndex((s) => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    renderTable();
    document.getElementById("editForm").style.display = "none";
  }
}









document.getElementById("returnButton").addEventListener("click", function() {
  window.location.href = "/student/student.html";  // Adjust this path to match your routing setup
});

// Data for charts
const lineChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Meal Redemptions",
      data: [50, 75, 60, 90, 120, 85, 100],
      borderColor: "#2f8c85",
      backgroundColor: "rgba(47, 140, 133, 0.2)",
      tension: 0.4,
    },
  ],
};

const barChartData = {
  labels: ["Rice", "Vegetables", "Meat", "Spices", "Oil"],
  datasets: [
    {
      label: "Inventory Usage",
      data: [40, 30, 50, 20, 35],
      backgroundColor: [
        "#2f8c85",
        "#4db6ac",
        "#26a69a",
        "#00796b",
        "#004d40",
      ],
    },
  ],
};

const donutChartData = {
  labels: ["Turned On", "Turned Off"],
  datasets: [
    {
      data: [80, 20],
      backgroundColor: ["#2f8c85", "#d7f0ed"],
    },
  ],
};

// Initialize charts
const lineCtx = document.getElementById("lineChart").getContext("2d");
new Chart(lineCtx, {
  type: "line",
  data: lineChartData,
});

const barCtx = document.getElementById("barChart").getContext("2d");
new Chart(barCtx, {
  type: "bar",
  data: barChartData,
});

const donutCtx = document.getElementById("donutChart").getContext("2d");
new Chart(donutCtx, {
  type: "doughnut",
  data: donutChartData,
});








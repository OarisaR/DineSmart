document.addEventListener("DOMContentLoaded", function () {
  // Sample Inventory Data (No more hall/dining manager ID logic)
  const inventory = [
    { itemName: "Sugar", stock: 50, reorderLevel: 20, stockUnit: "kg" },
    { itemName: "Rice", stock: 100, reorderLevel: 40, stockUnit: "kg" },
    { itemName: "Oil", stock: 30, reorderLevel: 10, stockUnit: "liters" },
    { itemName: "Salt", stock: 30, reorderLevel: 80, stockUnit: "kg" },
    { itemName: "Tea", stock: 25, reorderLevel: 25, stockUnit: "kg" }
  ];

  // Function to determine stock status based on reorder level
  const getStockStatus = (stock, reorderLevel) => {
    const numericStock = Number(stock); // Ensure stock is a number
    const numericReorderLevel = Number(reorderLevel); // Ensure reorderLevel is a number

    if (numericStock < numericReorderLevel) return "Low";
    const moderateThreshold = numericReorderLevel * 1.35; // 35% above reorder level
    if (numericStock < moderateThreshold) return "Moderate";
    return "Sufficient";
  };

  // Function to get CSS class for stock status
  const getStatusClass = (stock, reorderLevel) => {
    const status = getStockStatus(stock, reorderLevel);
    switch (status) {
      case "Low":
        return "low-stock";
      case "Moderate":
        return "moderate-stock";
      case "Sufficient":
        return "sufficient-stock";
      default:
        return "";
    }
  };

  // Render inventory data into table
  const renderInventoryTable = (inventory) => {
    const inventoryTableBody = document.getElementById("inventoryTableBody");
    inventoryTableBody.innerHTML = ""; // Clear existing rows
    inventory.forEach((item) => {
      const row = document.createElement("tr");
      row.classList.add("inventory-table-row");

      row.innerHTML = `
        <td class="inventory-table-data">${item.itemName}</td>
        <td class="inventory-table-data">${item.stock}</td>
        <td class="inventory-table-data">${item.stockUnit}</td>
        <td class="inventory-table-data ${getStatusClass(item.stock, item.reorderLevel)}">
          ${getStockStatus(item.stock, item.reorderLevel)}
        </td>
      `;
      inventoryTableBody.appendChild(row);
    });
  };

  // Add inventory item
  const addInventoryItem = (name, stock, reorderLevel, stockUnit) => {
    const newItem = {
      itemName: name,
      stock,
      reorderLevel,
      stockUnit
    };
    inventory.push(newItem);  // Add to the inventory array
    renderInventoryTable(inventory);
  };

  // Handle form submission
  const form = document.getElementById("addInventoryForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const { name, stock, reorderLevel, stockUnit } = form.elements;
    addInventoryItem(
      name.value,
      parseInt(stock.value),
      parseInt(reorderLevel.value),
      stockUnit.value
    );
    form.reset();
  });

  renderInventoryTable(inventory); // Initially render inventory data
});



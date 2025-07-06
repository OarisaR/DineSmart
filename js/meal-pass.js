const { jsPDF } = window.jspdf;

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB");
  }

  const generatePDF = async (mealType, date, studentName, studentID) => {
    const doc = new jsPDF({ unit: "in", format: [5, 6] });

    // Background fill
    doc.setFillColor(255, 255, 255);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(53, 140, 133);
    const title = "Meal Pass";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 0.75);

    // Line
    doc.setDrawColor(53, 140, 133);
    doc.line(0.2, 1, doc.internal.pageSize.width - 0.2, 1);

    // Meal Type
    const verticalSpacing = 0.1;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    const mealText = `Meal Type: ${mealType}`;
    const mealTextWidth = doc.getTextWidth(mealText);
    doc.text(
      mealText,
      (doc.internal.pageSize.width - mealTextWidth) / 2,
      1.5 + verticalSpacing
    );

    // Date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const dateText = `Date: ${formatDate(date)}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    doc.text(
      dateText,
      (doc.internal.pageSize.width - dateTextWidth) / 2,
      2 + verticalSpacing
    );

    // Student Info
    const studentInfoText = `Student: ${studentName} (ID: ${studentID})`;
    const studentInfoTextWidth = doc.getTextWidth(studentInfoText);
    doc.text(
      studentInfoText,
      (doc.internal.pageSize.width - studentInfoTextWidth) / 2,
      2.5 + verticalSpacing
    );

    // Line separator
    doc.line(0.2, 3, doc.internal.pageSize.width - 0.2, 3);

    // QR Code
    const qrData = JSON.stringify({
      userID: studentID,
      mealType,
      date: formatDate(date),
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrData);
    const qrX = (doc.internal.pageSize.width - 1.5) / 2;
    const qrY = 3.5;
    doc.addImage(qrCodeDataUrl, "PNG", qrX, qrY, 1.5, 1.5);

    // Save PDF
    doc.save(`${mealType}_Pass_${formatDate(date)}.pdf`);
  };

  const lunchBtn = document.querySelector(".lunch-pass");
  if (lunchBtn) {
    lunchBtn.addEventListener("click", () => {
      const mealType = "Lunch";
      const date = new Date();
      const studentName = "Umme Sanjida"; 
      const studentID = "2104126"; 

      generatePDF(mealType, date, studentName, studentID);
    });
  }
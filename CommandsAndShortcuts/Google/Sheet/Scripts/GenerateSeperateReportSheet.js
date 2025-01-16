function sumAndInsertUntilColumn() {
  const sheetName = "your_sheet_name_here";
  const targetSheetName = "Reports"; // Target sheet where the results will be placed

  // Open the spreadsheet and get the specified sheet by name
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(targetSheetName);

  if (!sheet) {
    throw new Error(`Sheet with name "${sheetName}" not found.`);
  }
  if (!targetSheet) {
    throw new Error(`Target sheet with name "${targetSheetName}" not found.`);
  }

  console.log("Sheet name is:", sheet.getName());

  // Define the starting column (J), where dates are located and values are to be calculated
  const startColumn = columnToIndex("J");
  const columnSpan = 6; // Number of columns to sum in each range (Mon-Sun)
  const row = 92; // Row number where calculation is happening
  const dateRow = 4; // Row where dates are located (Mon-Sun headers)
  const targetRow = 2; // Starting row for inserting results in target sheet (Reports)

  // Calculate the stop column dynamically, assuming you're working within the data range
  const stopColumn = startColumn + (columnSpan * 3); // March 31st is the target

  let currentColumn = startColumn;
  let currentTargetRow = targetRow;

  // Find the start date from the first entry (should be Wednesday, Jan 1, 2025)
  const firstDate = sheet.getRange(dateRow, currentColumn).getValue(); // Start from the first date in the date row
  let currentDate = new Date(firstDate);

  // Loop through each week (every 6 columns) until March 31st (stopColumn)
  // while (currentDate <= new Date('2025-12-31')) { / Get report generated for all year
  while (currentDate <= new Date()) { // Get report generated till current date
    console.log("Loop Starts --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    
    // Get the start of the week (Monday) and the end of the week (Sunday)
    const startDate = getStartOfWeek(currentDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End date will be the Sunday of the same week

    // Extract the dates for the current week from the sheet
    const dates = sheet.getRange(dateRow, currentColumn, 1, columnSpan).getValues()[0];
    const values = sheet.getRange(row, currentColumn, 1, columnSpan).getValues()[0];

    console.log("Dates:", dates); // Logs the dates for the current week
    console.log("Values:", values); // Logs the values for the current week

    // Initialize sum for the week
    let weekSum = 0;

    // Loop through the dates and sum the corresponding values for the date range (Mon-Sun)
    for (let i = 0; i < dates.length; i++) {
      const currentCellDate = new Date(dates[i]);

      // Check if the current date is within the date range (Monday-Sunday)
      if (currentCellDate >= startDate && currentCellDate <= endDate) {
        weekSum += (Number(values[i]) || 0); // Sum the corresponding values
      }
    }

    // Calculate the percentage
    const percent = (weekSum * 100) / 1890;

    // Insert sum, percent, and date range into the "Reports" sheet
    targetSheet.getRange(currentTargetRow, 8).setValue(weekSum); // Column H for sum
    targetSheet.getRange(currentTargetRow, 9).setValue(percent); // Column I for percent

    // Insert the date range (startDate - endDate) in Column G
    targetSheet.getRange(currentTargetRow, 7).setValue(`${startDate.toDateString()} - ${endDate.toDateString()}`);

    // Add labels for the "Total" and "Percent" columns in the target sheet
    targetSheet.getRange(currentTargetRow, 6).setValue(`Week ${currentTargetRow - targetRow + 1}`); // Optional: Week label

    // Increment the target row for the next set of results
    currentTargetRow++;

    // Move to the next set of columns (6 columns per week)
    currentColumn += columnSpan;

    // Move the currentDate forward by 7 days for the next week
    currentDate.setDate(currentDate.getDate() + 7);
  }
}

/**
 * Helper function to convert column letter to index.
 * @param {string} column - Column letter (e.g., "A", "BZ").
 * @return {number} Column index (1-based).
 */
function columnToIndex(column) {
  let index = 0;
  for (let i = 0; i < column.length; i++) {
    index = index * 26 + column.charCodeAt(i) - 64;
  }
  return index;
}

/**
 * Helper function to get the start of the week (Monday) for any given date.
 * @param {Date} date - The date to calculate the start of the week.
 * @return {Date} The start date (Monday) of the week.
 */
function getStartOfWeek(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust so that 0 (Sunday) becomes -6
  const startOfWeek = new Date(date.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
  return startOfWeek;
}

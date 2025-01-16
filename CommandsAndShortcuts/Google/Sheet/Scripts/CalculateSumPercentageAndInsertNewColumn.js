function sumAndInsertUntilColumn() {
  // Open the active spreadsheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Define the starting column and the stop column
  const startColumn = columnToIndex("BY");
  const stopColumn = columnToIndex("FG"); // Target column to stop inserting
  const columnSpan = 6; // Number of columns to sum in each range. In this case summing or calculating percent of each week.
  const row = 92; // Row number where calculation is happening
  const rowLabel = 4; // Row number to place the label

  // Initialize the current column to the starting column
  let currentColumn = startColumn;

  // Loop until the current column exceeds the stop column
  while (currentColumn <= stopColumn) {
    // Calculate the end column for the current range
    const endColumn = currentColumn + columnSpan;

    // Get the values from the original range (currentColumn to endColumn)
    const rangeValues = sheet.getRange(row, currentColumn, 1, columnSpan + 1).getValues()[0];

    // Calculate the sum and percent of the range
    const sum = rangeValues.reduce((total, value) => total + (Number(value) || 0), 0);
    const percent = (sum * 100 )/ 1890;

    // Insert a new column after the calculated end column for the sum
    sheet.insertColumnAfter(endColumn);

    // Place the sum in the newly inserted column at row 92
    sheet.getRange(row, endColumn + 1).setValue(sum);

    sheet.getRange(rowLabel, endColumn + 1).setValue("Total");

    // Insert another column for the percent value after the sum column
    sheet.insertColumnAfter(endColumn + 1);

    // Place the percent in the newly inserted column at row 92
    sheet.getRange(row, endColumn + 2).setValue(percent);

    sheet.getRange(rowLabel, endColumn + 2).setValue("Percent");

    // Adjust the `currentColumn` to skip the newly added columns
    currentColumn = endColumn + 3; // Move to the next range, skipping the inserted columns
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

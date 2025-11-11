const { PrismaClient } = require("@prisma/client");

const { Parser } = require("json2csv");
const fs = require("fs");

const prisma = new PrismaClient();

async function exportToCsv(modelName) {
  try {
    // 1. Make sure model exists in PrismaClient

    // 2. Fetch data
    const records = await prisma[modelName].findMany();
    if (records.length === 0) {
      console.log(No records found in "${modelName}" table.);
      return;
    }

    // 3. Convert to CSV
    const parser = new Parser();
    const csv = parser.parse(records);

    // 4. Write file
    const dir = "./exports";
    fs.mkdirSync(dir, { recursive: true });
    const filePath = ${dir}/${modelName}.csv;
    fs.writeFileSync(filePath, csv);

    console.log(
      ✅ Exported ${records.length} rows from "${modelName}" to ${filePath}
    );
  } catch (err) {
    console.error("❌ Error exporting data:", err);
  } finally {
    await prisma.$disconnect();
  }
}

// --- entry point ---
const modelName = "contract";
exportToCsv(modelName);

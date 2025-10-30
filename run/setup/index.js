const { runSetCurrentFund } = require("../dispather/setCurrentFund");
require("dotenv").config();

async function main() {
  console.log("Starting post-deployment setup...");
  // Order matters; add more steps here as needed
  await runSetCurrentFund();
  console.log("Post-deployment setup complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



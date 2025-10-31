const { runSetCurrentFund } = require("../dispather/setCurrentFund");
const { runSetComptrollerLib } = require("../fundDeployer/setComptrollerLib");
require("dotenv").config();

async function main() {
  console.log("Starting post-deployment setup...");
  // Order matters; add more steps here as needed
  await runSetCurrentFund();
  await runSetComptrollerLib();
  await runSetVaultLib();
  await runSetProtocolFeeTracker();
  await runSetReleaseLive();
  await setEthUsd();
  await addPrimitives();
  await createList();
  await createList();
  await createList();
  await createList();
  await createList();   
  await addToList();

  console.log("Post-deployment setup complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



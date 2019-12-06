import app from "./app";

const PORT = process.env.PORT || 8081;

app.expressApp.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await app.mongoSetup();
});

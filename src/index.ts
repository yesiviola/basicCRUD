import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadData } from "./helpers/PreloadData";

AppDataSource.initialize().then((res) => {
  console.log("Connecion a la base de dato con exito");
  preloadData().then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });
});

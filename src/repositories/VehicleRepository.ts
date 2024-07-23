import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../entities/Vehicle";

const VehicleRepository = AppDataSource.getRepository(Vehicle);

export default VehicleRepository;

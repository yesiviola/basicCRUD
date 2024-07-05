import { VehicleModel } from "../config/data-source";
import CreateVehicleDto from "../dto/CreateVehicleDto";
import { Vehicle } from "../entities/Vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicle = await VehicleModel.find();
  return vehicle;
};

export const createVehicleService = async (
  vehicle: CreateVehicleDto
): Promise<Vehicle> => {
  const newVehicle = await VehicleModel.create(vehicle);
  await VehicleModel.save(newVehicle);
  return newVehicle;
};

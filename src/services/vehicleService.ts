import { VehicleModel, UserModel } from "../config/data-source";
import CreateVehicleDto from "../dto/CreateVehicleDto";
import { Vehicle } from "../entities/Vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find({
    relations: {
      user: true,
    },
  });
  return vehicles;
};

export const createVehicleService = async (
  vehicle: CreateVehicleDto
): Promise<Vehicle> => {
  const newVehicle = await VehicleModel.create(vehicle);
  await VehicleModel.save(newVehicle);

  const user = await UserModel.findOneBy({
    id: vehicle.userId,
  });

  if (user) {
    newVehicle.user = user;
    VehicleModel.save(newVehicle);
  }

  return newVehicle;
};

import { AppDataSource } from "../config/data-source";
import VehicleRepository from "../repositories/VehicleRepository";
import UserRepository from "../repositories/UserRepository";
import CreateVehicleDto from "../dto/CreateVehicleDto";
import { Vehicle } from "../entities/Vehicle";
import { DeepPartial } from "typeorm";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleRepository.find({
    relations: ["user"],
  });

  if (!vehicles.every((vehicle) => vehicle instanceof Vehicle)) {
    throw new Error("Los datos obtenidos no son vehículos.");
  }

  return vehicles;
};

export const createVehicleService = async (
  vehicle: CreateVehicleDto
): Promise<Vehicle> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const newVehicle = VehicleRepository.create(
      vehicle as DeepPartial<Vehicle>
    );
    await queryRunner.manager.save(newVehicle);

    const user = await UserRepository.findOneBy({ id: vehicle.userId });

    if (!user) {
      throw new Error("Usuario inexistente. No se ha podido crear el vehículo");
    }

    newVehicle.user = user;

    const savedVehicle = await queryRunner.manager.save(newVehicle);

    await queryRunner.commitTransaction();

    if (!(savedVehicle instanceof Vehicle)) {
      throw new Error("El dato guardado no es un vehículo.");
    }

    return savedVehicle;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new Error("Error al crear el vehículo");
  } finally {
    await queryRunner.release();
  }
};

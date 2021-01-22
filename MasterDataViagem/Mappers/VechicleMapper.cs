using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Vehicle;

namespace MasterDataViagem.Mappers {
    public class VehicleMapper {
        public static IVehicleDTO domainToDTO(Vehicle vd) {
            return new IVehicleDTO {
                Id = vd.Id.AsGuid(),
                licensePlate = vd.licensePlate,
                vin = vd.vin,
                vehicleType = vd.vehicleType,
                firstServiceDate = vd.firstServiceDate
            };
        }

        public static Vehicle dtoToDomain(IVehicleDTO vd) {
            return new Vehicle(vd.licensePlate, vd.vin, vd.vehicleType, vd.firstServiceDate);
        }
    }
}
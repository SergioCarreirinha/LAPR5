using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Vehicle;
using MasterDataViagem.Mappers;

namespace MasterDataViagem.Service
{
    public class VehicleService
    {
        private readonly IVehicleRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public VehicleService(IVehicleRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IVehicleDTO>> Get()
        {
            var list = await this._repo.GetAllAsync();

            List<IVehicleDTO> listDTO = list.ConvertAll<IVehicleDTO>(vehicle => VehicleMapper.domainToDTO(vehicle));

            return listDTO;
        }
        public async Task<IVehicleDTO> GetById(VehicleId id)
        {

            var vehicle = await this._repo.GetByIdAsync(id);

            if (vehicle == null) return null;

            return VehicleMapper.domainToDTO(vehicle);
        }

        public async Task<IVehicleDTO> Create(IVehicleDTO vehicle)
        {
            var obj = VehicleMapper.dtoToDomain(vehicle);

            if (!(await this._repo.verifyVehicleByLicensePlate(vehicle.licensePlate)) && !(await this._repo.verifyVehicleByVin(vehicle.vin))) {
                await this._repo.AddAsync(obj);


                await this._unitOfWork.CommitAsync();

                return new IVehicleDTO
                {
                    Id = obj.Id.AsGuid(),
                    licensePlate = obj.licensePlate,
                    vin = obj.vin,
                    vehicleType = obj.vehicleType,
                    firstServiceDate = obj.firstServiceDate,
                };
                
            } else {
                return null;
            }
        }

        public async Task<IVehicleDTO> DeleteAsync(VehicleId id)
        {
            var vehicle = await this._repo.GetByIdAsync(id);

            if (vehicle == null)
                return null;


            this._repo.Remove(vehicle);
            await this._unitOfWork.CommitAsync();

            return VehicleMapper.domainToDTO(vehicle);
        }
    }
}
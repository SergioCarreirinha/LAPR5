using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using System;

namespace MasterDataViagem.Domain.VehicleDuties
{
    public class VehicleDutyService
    {
        private readonly IVehicleDutyRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public VehicleDutyService(IVehicleDutyRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IVehicleDutyDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IVehicleDutyDTO> listDTO = list.ConvertAll<IVehicleDutyDTO>( vehicleDuty => new IVehicleDutyDTO{ 
                Id = vehicleDuty.Id.AsGuid(), 
                key = vehicleDuty.key,
                name = vehicleDuty.name,
                color = vehicleDuty.color,
                depots = vehicleDuty.depots,
                WorkBlocks = vehicleDuty.WorkBlocks
            });
            
            return listDTO;
        }
        public async Task<IVehicleDutyDTO> GetById(VehicleDutyId id){

            var vehicleDuty =  await this._repo.GetByIdAsync(id);

            if(vehicleDuty == null) return null;

            return new IVehicleDutyDTO{ 
                Id = vehicleDuty.Id.AsGuid(), 
                key = vehicleDuty.key,
                name = vehicleDuty.name,
                color = vehicleDuty.color,
                depots = vehicleDuty.depots,
                WorkBlocks = vehicleDuty.WorkBlocks
            };
        }

        public async Task<IVehicleDutyDTO> Create(IVehicleDutyDTO vehicleDuty)
        {
            var obj = new VehicleDuty(vehicleDuty.key, vehicleDuty.name, vehicleDuty.color, vehicleDuty.depots, vehicleDuty.WorkBlocks);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

           return new IVehicleDutyDTO{ 
                Id = obj.Id.AsGuid(),
                key = obj.key,
                name = obj.name,
                color = obj.color,
                depots = obj.depots,
                WorkBlocks = obj.WorkBlocks
            };
        }

        public async Task<IVehicleDutyDTO> DeleteAsync(VehicleDutyId id)
        {
            var vehicleDuty = await this._repo.GetByIdAsync(id); 

            if (vehicleDuty == null)
                return null;   
            
            this._repo.Remove(vehicleDuty);
            await this._unitOfWork.CommitAsync();

            return new IVehicleDutyDTO{ 
                Id = vehicleDuty.Id.AsGuid(), 
                key = vehicleDuty.key,
                name = vehicleDuty.name,
                color = vehicleDuty.color,
                depots = vehicleDuty.depots,
                WorkBlocks = vehicleDuty.WorkBlocks
            };
        }
    }
}
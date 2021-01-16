using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using System;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.DriverDutyTypes;

namespace MasterDataViagem.Service
{
    public class DriverDutyTypeService
    {
        private readonly IDriverDutyTypeRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public DriverDutyTypeService(IDriverDutyTypeRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IDriverDutyTypeDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IDriverDutyTypeDTO> listDTO = list.ConvertAll<IDriverDutyTypeDTO>( driverDutyType => new IDriverDutyTypeDTO{ 
                Id = driverDutyType.Id.AsGuid(),
                key = driverDutyType.key,
                name = driverDutyType.name,
                parameters = driverDutyType.parameters
            });
            
            return listDTO;
        }
        public async Task<IDriverDutyTypeDTO> GetById(DriverDutyTypeId id){

            var driverDutyType =  await this._repo.GetByIdAsync(id);

            if(driverDutyType == null) return null;

            return new IDriverDutyTypeDTO{ 
                Id = driverDutyType.Id.AsGuid(),
                key = driverDutyType.key,
                name = driverDutyType.name,
                parameters = driverDutyType.parameters
            };
        }
        public async Task<IDriverDutyTypeDTO> Create(IDriverDutyTypeDTO driverDutyType)
        {
            var obj = new DriverDutyType(driverDutyType.key, driverDutyType.name, driverDutyType.parameters);

            if (!this._repo.getByKey(driverDutyType.key)) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return new IDriverDutyTypeDTO{ 
                    Id = obj.Id.AsGuid(),
                    key = obj.key,
                    name = obj.name,
                    parameters = obj.parameters
                };
            }else {
                return null;
            }
        }

        public async Task<IDriverDutyTypeDTO> DeleteAsync(DriverDutyTypeId id)
        {
            var driverDutyType = await this._repo.GetByIdAsync(id); 

            if (driverDutyType == null)
                return null;   

            
            this._repo.Remove(driverDutyType);
            await this._unitOfWork.CommitAsync();

            return new IDriverDutyTypeDTO{ 
                Id = driverDutyType.Id.AsGuid(),
                key = driverDutyType.key,
                name = driverDutyType.name,
                parameters = driverDutyType.parameters
            };
        }
    }
}
using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Mappers;
using System;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.VehicleDuties;

namespace MasterDataViagem.Service
{
    public class VehicleDutyService
    {
        private readonly IVehicleDutyRepository _repo;
        private readonly IWorkBlockRepository _repoWb;
        private readonly IUnitOfWork _unitOfWork;

        public VehicleDutyService(IVehicleDutyRepository repo,IWorkBlockRepository repoWb, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._repoWb = repoWb;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IVehicleDutyDTO>> Get(){
            var list = await this._repo.getAllVehicleDuty();

            List<IVehicleDutyDTO> listDTO = list.ConvertAll<IVehicleDutyDTO>( vehicleDuty => VehicleDutyMapper.domainToDTO(vehicleDuty));

            return listDTO;
        }
        public async Task<IVehicleDutyDTO> GetById(VehicleDutyId id){

            var vehicleDuty =  await this._repo.GetByIdAsync(id);

            if(vehicleDuty == null) return null;

            return VehicleDutyMapper.domainToDTO(vehicleDuty);
        }

        public async Task<IVehicleDutyDTO> Create(CVehicleDutyDTO dto)
        {
            var obj = VehicleDutyMapper.cDtoToDomain(dto,this._repoWb);

            if (!(await this._repo.verifyVehicleDutyKey(dto.key))) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return VehicleDutyMapper.domainToDTO(obj);
            
            }else{
                return null;
            }
        }

        public async Task<IVehicleDutyDTO> CreateWithoutVerifications(IVehicleDutyDTO dto)
        {

            var obj = VehicleDutyMapper.dtoToDomain(dto);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return VehicleDutyMapper.domainToDTO(obj);
        }

        public async Task<IVehicleDutyDTO> DeleteAsync(VehicleDutyId id)
        {
            var vehicleDuty = await this._repo.GetByIdAsync(id); 

            if (vehicleDuty == null)
                return null;   
            
            this._repo.Remove(vehicleDuty);
            await this._unitOfWork.CommitAsync();

            return VehicleDutyMapper.domainToDTO(vehicleDuty);
        }
    }
}
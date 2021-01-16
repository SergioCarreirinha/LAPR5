using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.WorkBlocks;
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

        public async Task<IVehicleDutyDTO> Create(CVehicleDutyDTO dto)
        {
            List<WorkBlock> workBlockList=new List<WorkBlock>(); 
            foreach (var wb in dto.WorkBlocks)
            {

                if (wb != null)
                {

                    Console.Write(wb);
                    WorkBlock workBlock = new WorkBlock(wb);
                    WorkBlock l = this._repoWb.GetByIdAsync(workBlock.Id).Result;
                    workBlockList.Add(l);

                }
            }

            var obj = new VehicleDuty(dto.key, dto.name, dto.color, dto.depots, workBlockList);

            if (!this._repo.verifyVehicleDutyKey(dto.key)) {
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
            
            }else{
                return null;
            }
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
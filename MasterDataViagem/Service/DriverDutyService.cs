using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using System;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Service
{
    public class DriverDutyService
    {
        private readonly IDriverDutyRepository _repo;
        private readonly IWorkBlockRepository _repoWb;
        private readonly IUnitOfWork _unitOfWork;

        public DriverDutyService(IDriverDutyRepository repo,IWorkBlockRepository repoWb, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
            this._repoWb = repoWb;
        }

        public async Task<List<IDriverDutyDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IDriverDutyDTO> listDTO = list.ConvertAll<IDriverDutyDTO>( driverDuty => new IDriverDutyDTO{ 
                Id = driverDuty.Id.AsGuid(),
                key = driverDuty.key,
                name = driverDuty.name,
                color = driverDuty.color,
                type = driverDuty.type,
                workBlocks = driverDuty.workBlocks
            });
            
            return listDTO;
        }
        public async Task<IDriverDutyDTO> GetById(DriverDutyId id){

            var driverDuty =  await this._repo.GetByIdAsync(id);

            if(driverDuty == null) return null;

            return new IDriverDutyDTO{ 
                Id = driverDuty.Id.AsGuid(),
                key = driverDuty.key,
                name = driverDuty.name,
                color = driverDuty.color,
                type = driverDuty.type,
                workBlocks = driverDuty.workBlocks
            };
        }
            public async Task<IDriverDutyDTO> Create(CDriverDutyDTO dto)
        {
            List<WorkBlock> workBlockList=new List<WorkBlock>(); 
            foreach (var wb in dto.workBlocks)
            {

                if (wb != null)
                {
                    Console.Write(wb);
                    WorkBlock workBlock = new WorkBlock(wb);
                    WorkBlock l = this._repoWb.GetByIdAsync(workBlock.Id).Result;
                    workBlockList.Add(l);

                }
            }
            var obj = new DriverDuty(dto.key, dto.name, dto.color, dto.type, workBlockList);

            if (!this._repo.getByKey(dto.key)) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return new IDriverDutyDTO{ 
                    Id = obj.Id.AsGuid(),
                    key = obj.key,
                    name = obj.name,
                    color = obj.color,
                    type = obj.type,
                    workBlocks = obj.workBlocks
                };
            
            }else{
                return null;
            }
        }

        public async Task<IDriverDutyDTO> DeleteAsync(DriverDutyId id)
        {
            var driverDuty = await this._repo.GetByIdAsync(id); 

            if (driverDuty == null)
                return null;   

            
            this._repo.Remove(driverDuty);
            await this._unitOfWork.CommitAsync();

            return new IDriverDutyDTO{ 
                Id = driverDuty.Id.AsGuid(),
                key = driverDuty.key,
                name = driverDuty.name,
                color = driverDuty.color,
                type = driverDuty.type,
                workBlocks = driverDuty.workBlocks
            };
        }
    }
}
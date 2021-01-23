using MasterDataViagem.DTO;
using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Domain.WorkBlocks;
using System;
using System.Collections.Generic;
using MasterDataViagem.Repository;


namespace MasterDataViagem.Mappers
{
    public class DriverDutyMapper
    {
        public static IDriverDutyDTO domainToDTO(DriverDuty vd)
        {
            return new IDriverDutyDTO
            {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                name = vd.name,
                color = vd.color,
                type = vd.type,
                workBlocks = vd.workBlocks
            };
        }

        public static DriverDuty dtoToDomain(IDriverDutyDTO vd)
        {
            return new DriverDuty(vd.key, vd.name, vd.color, vd.type, vd.workBlocks);
        }

        public static DriverDuty cDtoToDomain(CDriverDutyDTO dto,IWorkBlockRepository repoWb)
        {
            List<WorkBlock> workBlockList=new List<WorkBlock>(); 
            foreach (var wb in dto.workBlocks)
            {

                if (wb != null)
                {
                    Console.Write(wb);
                    WorkBlock workBlock = new WorkBlock(wb);
                    WorkBlock l = repoWb.GetByIdAsync(workBlock.Id).Result;
                    workBlockList.Add(l);
                }
            }

            return new DriverDuty(dto.key, dto.name, dto.color, dto.type, workBlockList);
        }
    }
}
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Domain.WorkBlocks;
using System;
using System.Collections.Generic;
using MasterDataViagem.Repository;


namespace MasterDataViagem.Mappers
{
    public class VehicleDutyMapper
    {
        public static IVehicleDutyDTO domainToDTO(VehicleDuty vd)
        {
            return new IVehicleDutyDTO
            {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                name = vd.name,
                color = vd.color,
                depots = vd.depots,
                WorkBlocks = vd.WorkBlocks
            };
        }

        public static VehicleDuty dtoToDomain(IVehicleDutyDTO vd)
        {
            return new VehicleDuty(vd.key, vd.name, vd.color, vd.depots, vd.WorkBlocks);
        }

        public static VehicleDuty cDtoToDomain(CVehicleDutyDTO dto,IWorkBlockRepository repoWb)
        {
            List<WorkBlock> workBlockList=new List<WorkBlock>(); 
            foreach (var wb in dto.WorkBlocks)
            {

                if (wb != null)
                {

                    Console.Write(wb);
                    WorkBlock workBlock = new WorkBlock(wb);
                    WorkBlock l = repoWb.GetByIdAsync(workBlock.Id).Result;
                    workBlockList.Add(l);

                }
            }

            return new VehicleDuty(dto.key, dto.name, dto.color, dto.depots, workBlockList);
        }
    }
}
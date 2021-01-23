using MasterDataViagem.DTO;
using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Domain.Trip;
using System;
using System.Collections.Generic;
using MasterDataViagem.Repository;


namespace MasterDataViagem.Mappers
{
    public class WorkBlockMapper
    {
        public static IWorkBlockDTO domainToDTO(WorkBlock vd)
        {
            return new IWorkBlockDTO
            {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                startTime = vd.startTime,
                endTime = vd.endTime,
                startNode = vd.startNode,
                endNode = vd.endNode,
                isCrewTravelTime=vd.isCrewTravelTime,
                isActive=vd.isActive,
                trips=vd.trips
            };
        }

        public static WorkBlock dtoToDomain(IWorkBlockDTO vd)
        {
            return new WorkBlock(vd.key, vd.startTime, vd.endTime, vd.startNode, vd.endNode, vd.isCrewTravelTime, vd.isActive, vd.trips);
        }

        public static WorkBlock cDtoToDomain(CWorkBlockDTO workBlock,ITripRepository repoTp)
        {
            List<Tripes> tripsList = new List<Tripes>();
            foreach (var tp in workBlock.trips)
            {

                if (tp != null)
                {

                    
                    Tripes tripId = new Tripes(tp);
                    Tripes l = repoTp.GetByIdAsync(tripId.Id).Result;
                    tripsList.Add(l);

                }
            }

            return new WorkBlock(workBlock.key, workBlock.startTime, workBlock.endTime, workBlock.startNode, workBlock.endNode, workBlock.isCrewTravelTime, workBlock.isActive, tripsList);
        }
    }
}
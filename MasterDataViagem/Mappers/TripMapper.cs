using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.PassingTimes;
using System;
using System.Collections.Generic;
using MasterDataViagem.Repository;


namespace MasterDataViagem.Mappers
{
    public class TripMapper
    {
        public static ITripDTO domainToDTO(Tripes vd)
        {
            return new ITripDTO
            {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                IsEmpty = vd.IsEmpty,
                Orientation = vd.Orientation,
                Line = vd.Line,
                Path = vd.Path,
                IsGenerated = vd.IsGenerated,
                PassingTimes = vd.PassingTimes
            };
        }

        public static Tripes dtoToDomain(ITripDTO vd)
        {
            return new Tripes(vd.key, vd.IsEmpty, vd.Orientation, vd.Line, vd.Path, vd.IsGenerated, vd.PassingTimes);
        }

        public static Tripes cDtoToDomain(CTripDTO trip,IPassingTimeRepository repoPt)
        {
            List<PassingTime> passingTimeList= new List<PassingTime>(); 
            foreach (var pt in trip.PassingTimes)
            {

                if (pt != null)
                {

                    Console.Write(pt);
                    PassingTime ptId = new PassingTime(pt);
                    PassingTime ptM = repoPt.GetByIdAsync(ptId.Id).Result;
                    passingTimeList.Add(ptM);

                }
            }

            return new Tripes(trip.key, trip.IsEmpty, trip.Orientation, trip.Line, trip.Path, trip.IsGenerated, passingTimeList);
        }
    }
}
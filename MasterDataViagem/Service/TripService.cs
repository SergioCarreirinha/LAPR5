using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;
using System;

namespace MasterDataViagem.Service
{
    public class TripService
    {
        private readonly ITripRepository _repo;
        private readonly IPassingTimeRepository _repoPt;
        private readonly IUnitOfWork _unitOfWork;

        public TripService(ITripRepository repo, IUnitOfWork unitOfWork, IPassingTimeRepository repoPt)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
            this._repoPt = repoPt;
        }

        public async Task<List<ITripDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<ITripDTO> listDTO = list.ConvertAll<ITripDTO>( trip => new ITripDTO{ 
                Id = trip.Id.AsGuid(), 
                key = trip.key, 
                IsEmpty = trip.IsEmpty,
                Orientation = trip.Orientation,
                Line = trip.Line,
                Path = trip.Path, 
                IsGenerated = trip.IsGenerated,
                PassingTimes = trip.PassingTimes
            });
            
            return listDTO;
        }
        public async Task<ITripDTO> GetById(TripId id){

            var trip =  await this._repo.GetByIdAsync(id);

            if(trip == null) return null;

            return new ITripDTO{ 
                Id = trip.Id.AsGuid(), 
                key = trip.key, 
                IsEmpty = trip.IsEmpty,
                Orientation = trip.Orientation,
                Line = trip.Line,
                Path = trip.Path, 
                IsGenerated = trip.IsGenerated,
                PassingTimes = trip.PassingTimes
            };
        }

        public async Task<ITripDTO> Create(CTripDTO trip)
        {   
            List<PassingTime> passingTimeList= new List<PassingTime>(); 
            foreach (var pt in trip.PassingTimes)
            {

                if (pt != null)
                {

                    Console.Write(pt);
                    PassingTime ptId = new PassingTime(pt);
                    PassingTime ptM = this._repoPt.GetByIdAsync(ptId.Id).Result;
                    passingTimeList.Add(ptM);

                }
            }

            var obj = new Tripes(trip.key, trip.IsEmpty, trip.Orientation, trip.Line, trip.Path, trip.IsGenerated, passingTimeList);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

           return new ITripDTO{ 
                Id = obj.Id.AsGuid(), 
                key = obj.key, 
                IsEmpty = obj.IsEmpty,
                Orientation = obj.Orientation,
                Line = obj.Line,
                Path = obj.Path, 
                IsGenerated = obj.IsGenerated,
                PassingTimes = passingTimeList
            };
        }

        public async Task<ITripDTO> DeleteAsync(TripId id)
        {
            var trip = await this._repo.GetByIdAsync(id); 

            if (trip == null)
                return null;   

            
            this._repo.Remove(trip);
            await this._unitOfWork.CommitAsync();

            return new ITripDTO{ 
                Id = trip.Id.AsGuid(), 
                key = trip.key, 
                IsEmpty = trip.IsEmpty,
                Orientation = trip.Orientation,
                Line = trip.Line,
                Path = trip.Path, 
                IsGenerated = trip.IsGenerated,
                PassingTimes = trip.PassingTimes
            };
        }
    }
}
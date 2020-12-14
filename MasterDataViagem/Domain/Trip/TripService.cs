using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTime;

namespace MasterDataViagem.Domain.Trip
{
    public class TripService
    {
        private readonly ITripRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public TripService(ITripRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
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

        public async Task<ITripDTO> Create(ITripDTO trip)
        {
            var obj = new Trip(trip.key, trip.IsEmpty, trip.Orientation, trip.Line, trip.Path, trip.IsGenerated);

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
                PassingTimes = obj.PassingTimes
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
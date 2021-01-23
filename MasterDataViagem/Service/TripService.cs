using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;
using System;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Mappers;

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
            var list = await this._repo.getAllTrips();

            List<ITripDTO> listDTO = list.ConvertAll<ITripDTO>( trip => TripMapper.domainToDTO(trip));
            
            return listDTO;
        }
        public async Task<ITripDTO> GetById(TripId id){

            var trip =  await this._repo.GetByIdAsync(id);

            if(trip == null) return null;

            return TripMapper.domainToDTO(trip);
        }

        public async Task<ITripDTO> Create(CTripDTO trip)
        {   
            var obj = TripMapper.cDtoToDomain(trip,this._repoPt);

            if (!(await this._repo.getByKey(trip.key))) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return TripMapper.domainToDTO(obj);
            } else {
                return null;
            }
        }

        public async Task<ITripDTO> CreateWithoutVerifications(ITripDTO trip)
        {   

            var obj = TripMapper.dtoToDomain(trip);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return TripMapper.domainToDTO(obj);
        }

        public async Task<ITripDTO> DeleteAsync(TripId id)
        {
            var trip = await this._repo.GetByIdAsync(id); 

            if (trip == null)
                return null;   

            
            this._repo.Remove(trip);
            await this._unitOfWork.CommitAsync();

            return TripMapper.domainToDTO(trip);
        }
    }
}
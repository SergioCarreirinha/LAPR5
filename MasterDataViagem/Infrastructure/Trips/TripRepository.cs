using MasterDataViagem.Domain.Trip;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MasterDataViagem.Infrastructure.Trips
{
    public class TripRepository : BaseRepository<Tripes, TripId>, ITripRepository
    {
        
        private readonly DbSet<Tripes> _db;
        private readonly DbSet<PassingTime> _dbPT;

        public TripRepository(MDVDbContext context):base(context.Trips)
        {
           this._db = context.Trips;
           this._dbPT = context.PassingTimes;
        }


        public async Task<bool> getByKey(string _key){
            
            string query = $"SELECT * FROM [Trips] WHERE [key] ='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list == null){
                return false;
            }else{
                return true;
            }
        }

        public async Task<Tripes> getTripByKey(string _key)
        {

            string query = $"SELECT * FROM [Trips] WHERE [key] ='{_key}'";

            List<Tripes> list = await this._db.FromSqlRaw(query).ToListAsync();
            if(list.Count > 0) {
                return list[0];
            } else {
                return null;
            }
           
        }

        public async Task<List<Tripes>> getAllTrips() 
        {
            string query = $"SELECT * FROM [Trips]";

            List<Tripes> list = await this._db.FromSqlRaw(query).ToListAsync();

            foreach(Tripes trip in list)
            {
                string query2 = $"SELECT * FROM [PassingTimes] WHERE [TripesId]='{trip.Id.AsString()}'";
                List<PassingTime> listPT = await this._dbPT.FromSqlRaw(query2).ToListAsync();
                trip.PassingTimes = listPT;
            }

            return list;
        }

    }
}
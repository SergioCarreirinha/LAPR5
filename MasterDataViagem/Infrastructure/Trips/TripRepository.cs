using MasterDataViagem.Domain.Trip;
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

        public TripRepository(MDVDbContext context):base(context.Trips)
        {
           this._db = context.Trips;
        }


        public async Task<bool> getByKey(string _key){
            
            string query = $"SELECT * FROM [Trips] WHERE [key] ='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list[0].Id == null){
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

    }
}
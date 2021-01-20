using MasterDataViagem.Domain.Genetics;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace MasterDataViagem.Infrastructure.Genetics
{
    public class GeneticRepository : BaseRepository<Genetic, GeneticId>, IGeneticRepository
    {
        private readonly DbSet<Genetic> _db;
        private readonly DbSet<Population> _dbP;
        public GeneticRepository(MDVDbContext context):base(context.Genetics)
        {
           this._db = context.Genetics;
           this._dbP = context.Populations;
        }

        public async Task<List<Genetic>> getAllGenetics() 
        {
            string query = $"SELECT * FROM [Genetics]";

            List<Genetic> list = await this._db.FromSqlRaw(query).ToListAsync();

            foreach(Genetic gen in list)
            {
                string query2 = $"SELECT * FROM [Populations] WHERE [GeneticId]='{gen.Id.AsString()}'";
                List<Population> listPT = await this._dbP.FromSqlRaw(query2).ToListAsync();
                gen.population = listPT;
            }

            return list;
        }
    }
}
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using System;

namespace MasterDataViagem.Domain.Genetics
{
    public class GeneticService
    {
        private readonly IGeneticRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public GeneticService(IGeneticRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IGeneticDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IGeneticDTO> listDTO = list.ConvertAll<IGeneticDTO>( genetic => new IGeneticDTO
            { 
                Id = genetic.Id.AsGuid(), 
                population = genetic.population,
                evaluation = genetic.evaluation
            });
            
            return listDTO;
        }
        public async Task<IGeneticDTO> GetById(GeneticId id){

            var genetic =  await this._repo.GetByIdAsync(id);

            if(genetic == null) return null;

            return new IGeneticDTO{ 
                Id = genetic.Id.AsGuid(), 
                population = genetic.population,
                evaluation = genetic.evaluation
            };
        }

        public async Task<IGeneticDTO> Create(CGeneticDTO genetic)
        {
            List<Population> list = new List<Population>();
            foreach (var ele in genetic.population)
            {
                list.Add(new Population(ele));
            }

            var obj = new Genetic(list, genetic.evaluation);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return new IGeneticDTO{ 
                Id = obj.Id.AsGuid(), 
                population = obj.population,
                evaluation = obj.evaluation
            };
        }

        public async Task<IGeneticDTO> DeleteAsync(GeneticId id)
        {
            var genetic = await this._repo.GetByIdAsync(id); 

            if (genetic == null)
                return null;   

            
            this._repo.Remove(genetic);
            await this._unitOfWork.CommitAsync();

            return new IGeneticDTO{ 
                Id = genetic.Id.AsGuid(), 
                population = genetic.population,
                evaluation = genetic.evaluation
            };
        }
    }
}
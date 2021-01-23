using MasterDataViagem.DTO;
using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Domain.Genetics;
using System;
using System.Collections.Generic;
using MasterDataViagem.Repository;


namespace MasterDataViagem.Mappers
{
    public class GeneticMapper
    {
        public static IGeneticDTO domainToDTO(Genetic vd)
        {
            return new IGeneticDTO
            {
                Id = vd.Id.AsGuid(),
                population = vd.population,
                evaluation = vd.evaluation,

            };
        }

        public static Genetic dtoToDomain(IGeneticDTO vd)
        {
            return new Genetic(vd.population, vd.evaluation);
        }

        public static Genetic cDtoToDomain(CGeneticDTO genetic)
        {
            List<Population> list = new List<Population>();
            foreach (var ele in genetic.population)
            {
                list.Add(new Population(ele));
            }

            return new Genetic(list,genetic.evaluation);
        }
    }
}
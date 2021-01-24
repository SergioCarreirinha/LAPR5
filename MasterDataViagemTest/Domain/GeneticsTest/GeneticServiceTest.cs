using System;
using System.Collections.Generic;
using System.Linq;
using MasterDataViagem.Domain.Genetics;
using MasterDataViagem.Mappers;
using MasterDataViagem.Repository;
using MasterDataViagem.Service;
using MasterDataViagem.Domain.Shared;
using Xunit;
using Moq;

namespace MasterDataViagemTest.Domain.GeneticsTest
{

    public class GeneticServiceTest
    {
        private List<Population> pop = new List<Population>();
        private int Pop1 = 15000;
        private int Pop2 = 15;
        private int Pop3 = 1600;
        private int Pop4 = 1;
        
        private int evaluation = 980000;


        [Fact]
        public void GeneticServiceConstructor()
        {
            var mockGRepo = new Mock<IGeneticRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new GeneticService(mockGRepo.Object, mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var mockGRepo = new Mock<IGeneticRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new GeneticService(mockGRepo.Object, mockUnitRepo.Object);

            pop.Add(new Population(Pop1));
            pop.Add(new Population(Pop2));
            pop.Add(new Population(Pop3));
            pop.Add(new Population(Pop4));
            var ge = new Genetic(pop, evaluation);

            var mockRepo = new Mock<IGeneticRepository>();
            mockRepo.Setup(repo => repo.AddAsync(ge));
            mockUnitRepo.Setup(repo => repo.CommitAsync());


            var addedGE = await service.CreateWithoutVerifications(GeneticMapper.domainToDTO(ge));

            Assert.Equal(addedGE.evaluation, ge.evaluation);

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";
            
            var id = new GeneticId(Guid.Parse(IdValue));
            var mockUnitRepo = new Mock<IUnitOfWork>();

            pop.Add(new Population(Pop1));
            pop.Add(new Population(Pop2));
            pop.Add(new Population(Pop3));
            pop.Add(new Population(Pop4));
            var ge = new Genetic(id, pop, evaluation);

            var mockRepo = new Mock<IGeneticRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(ge);

            var service = new GeneticService(mockRepo.Object, mockUnitRepo.Object);

            var getGE = await service.GetById(id);

            Assert.Equal(IdValue, getGE.Id.ToString());
        }

        [Fact]
        public async void getAllGeneticTest()
        {
            var mockRepo = new Mock<IGeneticRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            
            mockRepo.Setup(repo => repo.getAllGenetics()).ReturnsAsync(createdGenetics());

            var service = new GeneticService(mockRepo.Object, mockUnitRepo.Object);

            var getGE = await service.Get();

            var GE = createdGenetics();

            Assert.Equal(getGE.Count(), GE.Count());

        }

        private List<Genetic> createdGenetics()
        {
            pop.Add(new Population(Pop1));
            pop.Add(new Population(Pop2));
            pop.Add(new Population(Pop3));
            pop.Add(new Population(Pop4));
            var geL = new List<Genetic>();
            geL.Add(new Genetic(pop, evaluation));
            geL.Add(new Genetic(pop, 385000));
            geL.Add(new Genetic(pop, 98750));
            return geL;
        }

    }


}
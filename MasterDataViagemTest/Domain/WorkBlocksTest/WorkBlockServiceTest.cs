using System;
using System.Collections.Generic;
using System.Linq;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Mappers;
using MasterDataViagem.Repository;
using MasterDataViagem.Service;
using MasterDataViagem.Domain.Shared;
using Xunit;
using Moq;

namespace MasterDataViagemTest.Domain.WorkBlocksTest
{

    public class WorkBlockServiceTest
    {
        private string keyWB = "WB:1";
        private int startTime = 27000;
        private int endTime = 30000;
        private string startNode = "Node:1";
        private string endNode = "Node:3";
        private Boolean isCrewTravelTime = false;
        private Boolean isActive = true;
        private List<Tripes> trips = new List<Tripes>();
        private string key = "Trip:1";
        private string IsEmpty = "true";
        private string Orientation = "Go";
        private string Line = "Line:2";
        private string Path = "Path:13";
        private string IsGenerated = "false";
        private List<PassingTime> PassingTimes  = new List<PassingTime>();
        private string keyPT = "123";
        private string Time = "27000";
        private string Node = "Node:1";
        private bool IsUsed = false;
        private bool IsReliefPoint = true;


        [Fact]
        public void WorkBlockServiceConstructor()
        {
            var mockWbRepo = new Mock<IWorkBlockRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockTrepo = new Mock<ITripRepository>();

            var service = new WorkBlockService(mockWbRepo.Object, mockUnitRepo.Object, mockTrepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var mockWbRepo = new Mock<IWorkBlockRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockTrepo = new Mock<ITripRepository>();

            var service = new WorkBlockService(mockWbRepo.Object, mockUnitRepo.Object, mockTrepo.Object);

            PassingTimes.Add(new PassingTime(this.keyPT, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            trips.Add(new Tripes(this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes));
            var wb = new WorkBlock(this.keyWB, this.startTime, this.endTime, this.startNode, this.endNode, this.isCrewTravelTime, this.isActive, trips);

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.AddAsync(wb));
            mockUnitRepo.Setup(repo => repo.CommitAsync());


            var addedWb = await service.CreateWithoutVerifications(WorkBlockMapper.domainToDTO(wb));

            Assert.Equal(addedWb.key, wb.key);

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";
            
            var id = new WorkBlockId(Guid.Parse(IdValue));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockTrepo = new Mock<ITripRepository>();

            PassingTimes.Add(new PassingTime(this.keyPT, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            trips.Add(new Tripes(this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes));
            var wb = new WorkBlock(id, this.keyWB, this.startTime, this.endTime, this.startNode, this.endNode, this.isCrewTravelTime, this.isActive, trips);

            var mockRepo = new Mock<IWorkBlockRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(wb);

            var service = new WorkBlockService(mockRepo.Object, mockUnitRepo.Object, mockTrepo.Object);

            var getWB = await service.GetById(id);

            Assert.Equal(IdValue, getWB.Id.ToString());
        }

        [Fact]
        public async void getAllTripsTest()
        {
            var mockRepo = new Mock<IWorkBlockRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockTrepo = new Mock<ITripRepository>();
            
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(createdWorkBlock());

            var service = new WorkBlockService(mockRepo.Object, mockUnitRepo.Object, mockTrepo.Object);

            var getPT = await service.Get();

            var PT = createdWorkBlock();

            Assert.Equal(getPT.Count(), PT.Count());

        }

        private List<WorkBlock> createdWorkBlock()
        {
            var wb = new List<WorkBlock>();
            wb.Add(new WorkBlock(this.keyWB, this.startTime, this.endTime, this.startNode, this.endNode, this.isCrewTravelTime, this.isActive, null));
            wb.Add(new WorkBlock("WB:2", 28000, 30000, "Node:7", "Node:6", false, true, null));
            wb.Add(new WorkBlock("WB:3", 29000, 31000, "Node:6", "Node:7", false, true, null));
            return wb;
        }

    }


}
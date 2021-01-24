using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Repository;
using MasterDataViagem.Mappers;
using MasterDataViagem.Service;
using Xunit;

namespace MasterDataViagemTest.Domain.DriverDutyServiceTest
{

    public class DriverDutyServiceTest
    {


        public Guid Id = Guid.NewGuid();
        public string key = "CHAVE";

        public string name ="name";

        public string color = "rgb";

        public string type = "type";

        public List<WorkBlock> workBlocks = new List<WorkBlock>();

        public string _key ="11";
        public int _startTime = 1;
        public int _endTime = 3;
        public string _startNode = "nodename";
        public string _endNode = "nodeFim";
        public Boolean _isCrewTravelTime = true;
        public Boolean _isActive = false;
        public List<Tripes> _trips = new List<Tripes>();



        [Fact]
        public void DefineDriverServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IDriverDutyRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockWorkRepo = new Mock<IWorkBlockRepository>();

            var service = new DriverDutyService(mockBlocoRepo.Object,mockWorkRepo.Object,mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            workBlocks.Add(new WorkBlock(this._key, this._startTime,this._endTime, this._startNode, this._endNode,this._isCrewTravelTime, this._isActive, this._trips));
            var driverDuty1 = new DriverDuty(this.key,this.name,this.color, this.type, this.workBlocks);


            var mockRepo = new Mock<IDriverDutyRepository>();
            mockRepo.Setup(repo => repo.AddAsync(driverDuty1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());
            var mockBlocoRepo = new Mock<IWorkBlockRepository>();

            var service = new DriverDutyService(mockRepo.Object,mockBlocoRepo.Object,mockUnitRepo.Object);

            var defineDriver = await service.CreateWithoutVerifications(DriverDutyMapper.domainToDTO(driverDuty1));

            Assert.Equal(defineDriver.key, driverDuty1.key);

        }
        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";

            var id = new DriverDutyId(Guid.Parse(IdValue));
            var PT = new DriverDuty(id,this.key,this.name,this.color, this.type, this.workBlocks);

            var mockRepo = new Mock<IDriverDutyRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(PT);
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockBlocoRepo = new Mock<IWorkBlockRepository>();

            var service = new DriverDutyService(mockRepo.Object,mockBlocoRepo.Object, mockUnitRepo.Object);

            var getPT = await service.GetById(id);

            Assert.Equal(IdValue, getPT.Id.ToString());
        }
        [Fact]
         public async void getDriverDutyTest()
        {
            var mockRepo = new Mock<IDriverDutyRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(createdDriverDuty());
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockBlocoRepo = new Mock<IWorkBlockRepository>();

            var service = new DriverDutyService(mockRepo.Object, mockBlocoRepo.Object , mockUnitRepo.Object);

            var getPT = await service.Get();

            var PT = createdDriverDuty();

            Assert.Equal(getPT.Count(), PT.Count());

        }

        private List<DriverDuty> createdDriverDuty()
        {
            workBlocks.Add(new WorkBlock(this._key, this._startTime,this._endTime, this._startNode, this._endNode,this._isCrewTravelTime, this._isActive, this._trips));
            var pts = new List<DriverDuty>();
            pts.Add(new DriverDuty(this.key,this.name,this.color, this.type, this.workBlocks));
            pts.Add(new DriverDuty("PassingTime:2", "36000", "Node:3","12312312",this.workBlocks));
            pts.Add(new DriverDuty("PassingTime:3", "58000", "Node:4","12312312",this.workBlocks));
            return pts;
        }
    }
}
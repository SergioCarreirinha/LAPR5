using System;
using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Domain.WorkBlocks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Trip;
using Xunit;

namespace MasterDataViagemTest.Domain.DriverDutyTest
{

    public class DriverDutyTest
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
        public void DriverConstructor()
        {
            workBlocks.Add(new WorkBlock(this._key, this._startTime,this._endTime, this._startNode, this._endNode,this._isCrewTravelTime, this._isActive, this._trips));
            var driverDuty = new DriverDuty(this.key,this.name,this.color, this.type, this.workBlocks);
            Assert.NotNull(driverDuty);
            Assert.Equal(driverDuty.key, this.key);
            Assert.Equal(driverDuty.name, this.name);
            Assert.Equal(driverDuty.color, this.color);
            Assert.Equal(driverDuty.type, this.type);
            Assert.Equal(driverDuty.workBlocks, this.workBlocks);
        }
    }
}

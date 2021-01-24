using System;
using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Domain.WorkBlocks;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.VehicleDutyTest
{

    public class VehicleDutyTest
    {

        public Guid Id = Guid.NewGuid();
        public string key = "key";
        public string name = "name";
        public string color = "red";
        public string depots = "depots";
        public List<WorkBlock> workBlocks = new List<WorkBlock>();


        [Fact]
        public void VehicleDutyConstructor()
        {
            var defineVehicleDutyDTO = new VehicleDuty(this.key,this.name, this.color, this.depots, this.workBlocks);
            Assert.NotNull(defineVehicleDutyDTO);
            Assert.Equal(defineVehicleDutyDTO.key, this.key);
            Assert.Equal(defineVehicleDutyDTO.name, this.name);
            Assert.Equal(defineVehicleDutyDTO.color, this.color);
            Assert.Equal(defineVehicleDutyDTO.depots, this.depots);
            Assert.Equal(defineVehicleDutyDTO.WorkBlocks, this.workBlocks);
        }
    }
}
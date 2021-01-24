using System;
using MasterDataViagem.Domain.DriverDutyTypes;
using MasterDataViagem.Domain.ParameterValues;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.DriverDutyTypeTest
{

    public class DriverDutyTypeTest
    {

         public Guid Id = Guid.NewGuid();
        public string key = "CHAVE";

        public string name ="name";

        public List<ParameterValue> parameters;

        [Fact]
        public void DriverConstructor()
        {
            var driverDutyType = new DriverDutyType(this.key,this.name,this.parameters);
            Assert.NotNull(driverDutyType);
            Assert.Equal(driverDutyType.key, this.key);
            Assert.Equal(driverDutyType.name, this.name);
            Assert.Equal(driverDutyType.parameters, this.parameters);
        }
    }
}

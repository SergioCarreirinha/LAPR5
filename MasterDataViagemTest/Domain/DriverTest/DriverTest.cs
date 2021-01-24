using System;
using MasterDataViagem.Domain.Driver;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.DriverTest
{

    public class DriverTest
    {

        public Guid Id = Guid.NewGuid();
        public string name = "Nome";
        public DateTime birthdate = new DateTime(1969,4,4);
        public int driverLicenseNum = 123;
        public DateTime licenseExpiration = new DateTime(1999,4,4);

        [Fact]
        public void DriverConstructor()
        {
            var defineDriverDTO = new Driver(this.name,this.birthdate, this.driverLicenseNum, this.licenseExpiration);
            Assert.NotNull(defineDriverDTO);
            Assert.Equal(defineDriverDTO.name, this.name);
            Assert.Equal(defineDriverDTO.birthdate, this.birthdate);
            Assert.Equal(defineDriverDTO.driverLicenseNum, this.driverLicenseNum);
            Assert.Equal(defineDriverDTO.licenseExpiration, this.licenseExpiration);
        }
    }
}

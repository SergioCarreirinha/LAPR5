using System;
using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.DriverDuty {
    public class DriverDuty : Entity<DriverId>, IAggregateRoot {

        public string name { get; set; }

        public DateTime birthdate { get; set; }

        public int driverLicenseNum { get; set; }

        public DateTime licenseExpiration { get; set; }

        public DriverDuty(string _name, DateTime _birthdate, int _driverLicenseNum, DateTime _licenseExpiration) {
            this.Id = new DriverId(Guid.NewGuid());
            this.name = _name;
            this.birthdate = _birthdate;
            this.driverLicenseNum = _driverLicenseNum;
            this.licenseExpiration = _licenseExpiration;
        }

        protected DriverDuty() {
            //ORM
        }
    }
}
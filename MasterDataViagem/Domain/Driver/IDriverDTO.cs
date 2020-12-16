using System;
using MasterDataViagem.Domain.PassingTime;
using System.Collections.Generic;
namespace MasterDataViagem.Domain.Driver
{
    public class IDriverDTO
    {
        public Guid Id { get; set; }
        
        public string name { get; set; }

        public DateTime birthdate { get; set; }

        public int driverLicenseNum { get; set; }

        public DateTime licenseExpiration { get; set; }

        //public Array<DriverType> driverTypes { get; set; }

    }
}
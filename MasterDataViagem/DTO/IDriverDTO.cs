using System;
using System.Collections.Generic;
namespace MasterDataViagem.DTO
{
    public class IDriverDTO
    {
        public Guid Id { get; set; }
        
        public string name { get; set; }

        public DateTime birthdate { get; set; }

        public int driverLicenseNum { get; set; }

        public DateTime licenseExpiration { get; set; }

    }
}
using System;

namespace MasterDataViagem.DTO
{
    public class IParameterValueDTO
    {
        public Guid Id { get; set; }
        
        public string key { get; set; }

        public string parameter { get; set; }

        public string value { get; set; }

    }
}
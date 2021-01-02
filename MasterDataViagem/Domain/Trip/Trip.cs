using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagem.Domain.Trip {
    public class Tripes : Entity<TripId>, IAggregateRoot {

        public string key { get; set; }

        public string IsEmpty { get; set; }

        public string Orientation { get; set; }

        public string Line { get; set; }

        public string Path { get; set; }

        public string IsGenerated { get; set; }

        public List<PassingTime> PassingTimes { get; set; }

        public Tripes(string _key, string _isEmpty, string _orientation, string _line, string _path, string _isGenerated, List<PassingTime> _passingTime) {
            this.Id = new TripId(Guid.NewGuid());
            this.key = _key;
            this.IsEmpty = _isEmpty;
            this.Orientation = _orientation;
            this.Line = _line;
            this.Path = _path;
            this.IsGenerated = _isGenerated;
            this.PassingTimes = _passingTime;
        }

        public Tripes(string _id){
            this.Id = new TripId(_id);
        }

        protected Tripes() {
            //ORM
        }
    }
}
using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagem.Domain.Trip {
    public class Tripes : Entity<TripId>, IAggregateRoot {

        public string key { get; set; }

        public bool IsEmpty { get; set; }

        public string Orientation { get; set; }

        public string Line { get; set; }

        public string Path { get; set; }

        public bool IsGenerated { get; set; }

        public List<PassingTime> PassingTimes { get; set; }

        public Tripes(string _key, bool _isEmpty, string _orientation, string _line, string _path, bool _isGenerated) {
            this.Id = new TripId(Guid.NewGuid());
            this.key = _key;
            this.IsEmpty = _isEmpty;
            this.Orientation = _orientation;
            this.Line = _line;
            this.Path = _path;
            this.IsGenerated = _isGenerated;
            this.PassingTimes = new List<PassingTime>();
        }

        protected Tripes() {
            //ORM
        }
    }
}
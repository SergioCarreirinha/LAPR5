using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Service;
using MasterDataViagem.DTO;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase {
        private readonly TripService _service;

        public TripController(TripService tripService)
        {
            _service = tripService;
        }

        // GET: api/Trip
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ITripDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/Trip/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ITripDTO>> GetById(Guid id)
        {
            var cat = await _service.GetById(new TripId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Trip
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ITripDTO>> Create(CTripDTO dto)
        {
            var cat = await _service.Create(dto);

            if (cat != null) {
                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            } else {
                return BadRequest();
            }
        }

        
        // DELETE: api/Trip/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<ITripDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new TripId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Vehicle;
using Microsoft.AspNetCore.Authorization;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase {
        private readonly VehicleService _service;

        public VehicleController(VehicleService vehicleService)
        {
            _service = vehicleService;
        }

        // GET: api/vehicle
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IVehicleDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/vehicle/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IVehicleDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetById(new VehicleId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/vehicle
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IVehicleDTO>> Create(IVehicleDTO dto)
        {
            var cat = await _service.Create(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // DELETE: api/vehicle/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IVehicleDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new VehicleId(id));

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
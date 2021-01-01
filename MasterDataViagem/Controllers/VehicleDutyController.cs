using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Domain.WorkBlocks;
using Microsoft.AspNetCore.Authorization;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleDutyController : ControllerBase {
        private readonly VehicleDutyService _service;

        public VehicleDutyController(VehicleDutyService vehicleDutyService)
        {
            _service = vehicleDutyService;
        }

        // GET: api/vehicleDuty
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IVehicleDutyDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/vehicleDuty/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IVehicleDutyDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetById(new VehicleDutyId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/vehicleDuty
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IVehicleDutyDTO>> Create(CVehicleDutyDTO dto)
        {
            Console.Write("OLAAAAA");
            var cat = await _service.Create(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // DELETE: api/vehicleDuty/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IVehicleDutyDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new VehicleDutyId(id));

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
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MasterDataViagem.Service;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase {

        private readonly FileUploadService _service;

        public  FileUploadController(FileUploadService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ImportFile(IFormFile file)
        {
            string filePath = Path.GetTempFileName();
            
            if(file.Length > 0)
            {
                using( var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            if(await _service.ImportFile(filePath)){
                return Ok();
            } else {
                return BadRequest();
            }

            
        }
    }
}
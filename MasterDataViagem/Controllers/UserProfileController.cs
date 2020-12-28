using Microsoft.AspNetCore.Authorization;    
using Microsoft.AspNetCore.Mvc;   
    
namespace MasterDataViagem.Controllers    
{    
    [Route("api/[controller]")]
    [ApiController]  
    public class UserProfileController : ControllerBase    
    {    
        [HttpGet]   
        [Authorize(Roles = "Client")]
        [Route("ForClient")] 
        public IActionResult GetClientData()    
        {    
            return Ok("This is an normal user");    
        }    
    
        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("ForAdmin")]
        public IActionResult GetAdminData()    
        {    
            return Ok("This is an Admin user");    
        }    
    }    
}    
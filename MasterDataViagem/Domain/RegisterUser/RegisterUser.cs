using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MasterDataViagem.Domain.RegisterUser {

    public class RegisterUser
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }
        
        public string Role { get; set; }
    }

}
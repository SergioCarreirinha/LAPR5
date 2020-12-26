using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MasterDataViagem.Domain.LoginUser {

    public class Token
    {
        [Required]
        public string token { get; set; }

        public Token(string _key) {
            this.token = _key;
        }
    }

}
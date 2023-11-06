using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z](?=.*[A-Z])).{4,8}$", ErrorMessage = "Strong password required")]
        public string Password { get; set; }
        public string Username { get; set; }

        [Required]
        public string DisplayName { get; set; }
    }
}
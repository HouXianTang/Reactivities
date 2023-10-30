namespace API.DTOs
{
    public class UserDto
    {
        /*
        DTO = Data Transfer Objects. It encapsulate data that needs
        to be transferred across various layers or components of an
        application. This class defines the data that will transfer 
        after a user is successfully login.
        */

        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }   
    }
}
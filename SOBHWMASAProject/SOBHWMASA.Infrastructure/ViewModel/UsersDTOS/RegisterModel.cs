using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.UsersDTOS
{
    public class RegisterModel
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Admin, Manager, Cashier, User
        public string PhoneNumber { get; set; }
        public Address Address { get; set; }
    }
}

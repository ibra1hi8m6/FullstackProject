using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.Users
{
    public class RegisterModel
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; } // Admin, Manager, Cashier, User
        public Address Address { get; set; }
    }
}

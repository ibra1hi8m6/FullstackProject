using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Users
{
    public class Address
    {
        public int Id { get; set; }  

        public string Description { get; set; } = null!;

        public string? AreaName { get; set; }           
        public string? StreetName { get; set; }         
        public string? BuildingNumber { get; set; }    
        public string? FloorNumber { get; set; }       
        public string? FlatNumber { get; set; }

        public string? ApplicationUserID { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.AddressDTOS
{
    public class AddressCreateDto
    {
        public string Description { get; set; }
        public string? AreaName { get; set; }
        public string? StreetName { get; set; }
        public string? BuildingNumber { get; set; }
        public string? FloorNumber { get; set; }
        public string? FlatNumber { get; set; }
        public string ApplicationUserID { get; set; }
    }
}

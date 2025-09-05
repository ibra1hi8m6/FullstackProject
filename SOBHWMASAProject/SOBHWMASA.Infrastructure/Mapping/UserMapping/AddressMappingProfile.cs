using AutoMapper;
using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Infrastructure.ViewModel.AddressDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.Mapping.UserMapping
{
    public class AddressMappingProfile : Profile
    {
        public AddressMappingProfile()
        {
            // CreateMap<Source, Destination>();


            CreateMap<Address, AddressReadDto>();
            CreateMap<AddressCreateDto, Address>();
        }
    }
}

using AutoMapper;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.OrderDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.Mapping.OrderMapping
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile() {
            CreateMap<Order, OrderReadDto>();
            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.OrderNumber, opt => opt.Ignore()) // generated in service
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()); // set in service

        }
    }
}

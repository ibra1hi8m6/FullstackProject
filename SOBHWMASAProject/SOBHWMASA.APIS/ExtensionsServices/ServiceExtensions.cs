
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SOBHWMASA.Data;
using SOBHWMASA.Domain.Entities.Products;
using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Infrastructure.Mapping.OrderMapping;
using SOBHWMASA.Infrastructure.Mapping.ProductMapping;
using SOBHWMASA.Infrastructure.Mapping.UserMapping;
using SOBHWMASA.Service.Implementation.IService.IOrder;
using SOBHWMASA.Service.Implementation.IService.IProduct;
using SOBHWMASA.Service.Implementation.IService.IUser;
using SOBHWMASA.Service.Implementation.Service.Orders;
using SOBHWMASA.Service.Implementation.Service.Product;
using SOBHWMASA.Service.Implementation.Service.User;

namespace SOBHWMASA.APIs.ExtensionsServices
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register your services here

            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
           

            //Services

            services.AddScoped<ICouponService, CouponService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IAddressService, AddressService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IIngredient, IngredientService>();
            services.AddScoped<ISizeService, SizeService>();
            services.AddScoped<IMealService, MealService>(provider =>
            {
                var mealRepo = provider.GetRequiredService<IRepository<Meal>>();
                var categoryMealRepo = provider.GetRequiredService<IRepository<CategoryMeal>>(); // If needed in MealService constructor
                var mealSizeRepo = provider.GetRequiredService<IRepository<MealSize>>();
                var mealIngredientRepo = provider.GetRequiredService<IRepository<MealIngredient>>();
                var mapper = provider.GetRequiredService<IMapper>();

                // Get the IWebHostEnvironment instance from the service provider
                // builder.Environment is already of type IWebHostEnvironment in web projects
                var webHostEnvironment = provider.GetRequiredService<IWebHostEnvironment>(); // <--- Get IWebHostEnvironment

                // Pass the WebRootPath to the MealService constructor
                return new MealService(
                    mealRepo,
                    categoryMealRepo, // Pass this if your MealService constructor needs it
                    mealSizeRepo,
                    mealIngredientRepo,
                    mapper,
                    webHostEnvironment.WebRootPath); // <--- Pass the string here
            });

            services.AddAutoMapper(config =>
            {
                // Add your profiles here
                config.AddProfile<CartMappingProfile>();
                config.AddProfile<IngredientMappingProfile>();
                config.AddProfile<MealMappingProfile>();
                config.AddProfile<SizeMappingProfile>();
                config.AddProfile<CartMappingProfile>();
                config.AddProfile<CouponMappingProfile>();
                config.AddProfile<OrderMappingProfile>();
                config.AddProfile<AddressMappingProfile>();
   
                
            });
            return services;
        }
    }
}

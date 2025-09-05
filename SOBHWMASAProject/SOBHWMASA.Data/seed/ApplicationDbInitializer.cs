using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SOBHWMASA.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Data.seed
{
    public static class ApplicationDbInitializer
    {
        public static async Task SeedAdminAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string adminEmail = "Admin@gmail.com";
            string adminPassword = "Admin@123";
            string adminRole = "Admin";

            

            // Ensure user exists
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FirstName = "System",
                    SecondName = "Admin",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, adminRole);

                    // Add Address with only description
                    var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
                    context.Addresses.Add(new Address
                    {
                        Description = "Default system admin address",
                        ApplicationUserID = adminUser.Id
                    });
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}

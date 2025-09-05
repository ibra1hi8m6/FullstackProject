using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using SOBHWMASA.APIS.ExtensionsServices;
using SOBHWMASA.Data.seed;

namespace SOBHWMASA.APIS.WebApp
{
    public static class ConfigurationWebApp
    {
        public static async Task ConfigureWebAppAsync(this WebApplication app)
        {


            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                await RoleSeeder.SeedRoles(roleManager);
            }
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                await ApplicationDbInitializer.SeedAdminAsync(services);
            }
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SOBHWMASA API v1"));
            }
            var webRootPath = app.Environment.WebRootPath
                    ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

            var uploadsPath = Path.Combine(webRootPath, "uploads");
            Directory.CreateDirectory(uploadsPath);




          
            app.UseStaticFiles(); // Enable serving static files
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(uploadsPath),
                RequestPath = "/uploads"
            });
            
        
        }
    }
}

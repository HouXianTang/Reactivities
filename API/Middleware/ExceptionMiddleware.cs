using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{

    /**
    Exception middleware is created to allow us to do something specific
    when we encounter an exception. We can override the default exception
    catching behaviour and add our own implementation so we are in control
    over what happens when an exception occurs.
    **/

    public class ExceptionMiddleware 
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next; // RequestDelegate is a function that can process an HTTP Request
            _logger = logger;
            _env = env; // Provides information about the hosting environment an applicaiton is running in
        }

        public async Task InvokeAsync(HttpContext context) // This is a built in method. When application receives a request, it's going to look for it in middleware to process the logic
        {
            try
            {
                await _next(context); // Catch exception
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // Type 500

                var response = _env.IsDevelopment() ? 
                    new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
                    new AppException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
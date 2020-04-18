using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Campus.Master.API.Models.Project;
using Campus.Master.API.Models;

namespace Campus.Master.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger _logger;

        public ProjectController(ILogger<ProjectController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// GET api/project?page={number}&items={number}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> FetchProjects([FromQuery] int page, [FromQuery] int items)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Fetch Projects: Page={page}, Items={items}");
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new [] 
            {
                new ProjectModel {
                    Id = 1,
                    Name = "Name",
                    Color = "Color",
                    Status = "Status"
                },
                new ProjectModel {
                    Id = 2,
                    Name = "Name",
                    Color = "Color",
                    Status = "Status"
                }
            });
            
            return Ok(result);
        }

        /// <summary>
        /// GET api/project/{id}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Get Project By Id #{id}");
            
            // TODO: Put business logic here
            
            var result = await Task.Run(() => new ProjectModel 
            {
                Id = 1,
                Name = "Name",
                Color = "Color",
                Status = "Status"
            });
            
            return Ok(result);
        }

        /// <summary>
        /// POST api/project
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        ///
        /// {
        /// “Name”: “...”,
        /// “Color”: “...”,
        /// “Status”: “...”
        /// }
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjectDataModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Create Project");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            var idOfNewProject = 1;

            var status = new StateTransfer
            {
                Message = $"'{model.Name}' project is created!",
                Payload = $"/project/{idOfNewProject}"
            };
            
            return Created(status.Payload, status);
        }

        /// <summary>
        /// PUT api/project/{id}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// 
        /// {
        ///     “Name”: “...”,
        ///     “Color”: “...”,
        ///     “Status”: “...”
        /// }
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(int id, [FromBody] ProjectDataModel model)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Edit Project #{id}");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            var status = new StateTransfer
            {
                Message = "Project fields are updated now!",
                Payload = ""
            };
            
            return Ok(status);
        }

        /// <summary>
        /// DELETE api/project/{id}
        /// Authentication: Bearer {token}
        /// Content-Type: application/json
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            _logger.LogInformation($"[{DateTime.Now} INFO] Delete Profile #{id}");
            
            // TODO: Put business logic here
            await Task.CompletedTask;
            
            return Ok(new StateTransfer
            {
                Message = "Project is deleted now!",
                Payload = ""
            });
        }
    }
}
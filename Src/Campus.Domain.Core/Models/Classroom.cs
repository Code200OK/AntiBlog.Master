using System;
using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Classroom : IStrictUserReference
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
        public string Location { get; set; }
        public bool IsOnline { get; set; }

        public int CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }

        public int ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TicketPlanetV2.DAL.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class tk_EventCategory
    {
        public int Itbid { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<int> UserId { get; set; }
        public string Status { get; set; }
    }
}

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
    
    public partial class tk_Location
    {
        public int Itbid { get; set; }
        public string LocationCode { get; set; }
        public string LocationName { get; set; }
        public string StateCode { get; set; }
        public string MerchantID { get; set; }
        public Nullable<int> UserId { get; set; }
        public string Status { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
    }
}

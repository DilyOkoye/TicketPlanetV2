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
    
    public partial class tk_Tickets
    {
        public int Itbid { get; set; }
        public string MerchantId { get; set; }
        public string MerchantName { get; set; }
        public string TicketId { get; set; }
        public Nullable<int> TicketType { get; set; }
        public Nullable<int> TicketLocationId { get; set; }
        public Nullable<int> TicketClass { get; set; }
        public Nullable<int> NoOfTickets { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<System.DateTime> ShowDate { get; set; }
        public string ShowId { get; set; }
        public string HallNo { get; set; }
        public string SeatNo { get; set; }
    }
}

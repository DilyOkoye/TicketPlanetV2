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
    
    public partial class tk_FlightPassenger
    {
        public int Itbid { get; set; }
        public string ReferenceNo { get; set; }
        public string PayStackReference { get; set; }
        public string PassengerFullname { get; set; }
        public string PassengerSex { get; set; }
        public Nullable<int> PassengerNo { get; set; }
        public Nullable<int> Adult { get; set; }
        public string TripType { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<int> RouteId { get; set; }
        public Nullable<int> CompanyTypeId { get; set; }
        public string BusId { get; set; }
        public string CurrencyCode { get; set; }
        public Nullable<System.DateTime> DepartureDate { get; set; }
        public Nullable<System.DateTime> ArrivalDate { get; set; }
        public string Hold { get; set; }
        public string Reschedule { get; set; }
        public Nullable<System.DateTime> RescheduleDate { get; set; }
        public Nullable<decimal> ReschedulePrice { get; set; }
        public Nullable<int> SeatNo { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public string Status { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketPlanetV2.DAL.Entity;
using TicketPlanetV2.DAL.Implementation;
using TicketPlanetV2.DAL.Interfaces;

namespace TicketPlanet.DAL.RepositoryCalls
{


    public class ThePalmsPerformanceFilm : Repository<tk_GenesisPalmsPerformance>, IThePalmsPerformanceFilm
    {
        public ThePalmsPerformanceFilm(IDbFactory dbFactory)
            : base(dbFactory) { }
    }

    public interface IThePalmsPerformanceFilm : IRepository<tk_GenesisPalmsPerformance>
    {

    }

}

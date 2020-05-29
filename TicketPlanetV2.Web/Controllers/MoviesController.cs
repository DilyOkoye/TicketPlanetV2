using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using TicketPlanetV2.BAL.GenericModel.ViewModel;
using TicketPlanetV2.BAL.MovieModel;

namespace TicketPlanetV2.Web.Controllers
{
    public class MoviesController : Controller
    {
        public GenericViewModel oGenericViewModel;
        public MoviesModelClass oMoviesModelClass;
        public FilmHouseModel oFilmHouseModel;
        public MoviesController()
        {
            oGenericViewModel = new GenericViewModel();
            oMoviesModelClass = new MoviesModelClass();
            oFilmHouseModel = new FilmHouseModel();
        }
        // GET: Movies

        public ActionResult Test()
        {
            return View();
        }

            public ActionResult Index()
        {
            //#region Film House
            ////this return cinema list
            //oGenericViewModel.drpCinema = oMoviesModelClass.ListOfCinemas();
            //// this return cinemaChains like id, chainId, name, timezone, and address etc
            //oGenericViewModel.CinemaChainSiteList = oFilmHouseModel.GetCinemaChainSites();
            ////list of movies and chain id, 
            //oGenericViewModel.CinemaChainFilms = oFilmHouseModel.GetCinemaChainFilms();
            //oGenericViewModel.ShowtimeList = await oMoviesModelClass.ListOfShowtimes("3f2f862b-2702-4ea3-4385-08d5c686e473");
            //#endregion

            #region Genesis
            oGenericViewModel.drpGenesisCinema = oMoviesModelClass.ListOfCinemas(1);
            oGenericViewModel.MovieList =  oMoviesModelClass.ListofMovies(1);
            oGenericViewModel.CinemaID = oGenericViewModel.MovieList.Count > 0 ? oGenericViewModel.MovieList.FirstOrDefault().CinemaId : 0;
            #endregion

            //#region Maturion
            //oGenericViewModel.drpMaturionCinema = oMoviesModelClass.ListOfMatCinemas(11);
            //oGenericViewModel.MaturionMovieList = await oMoviesModelClass.ListofMovies(11);
            //oGenericViewModel.MaturionCinemaID = oGenericViewModel.MovieList.Count > 0 ? oGenericViewModel.MovieList.FirstOrDefault().CinemaId : 0;
            //#endregion
            return View(oGenericViewModel);
        }

        public ActionResult GetCinemaLocation(string cinema)
        {
           
            if (!string.IsNullOrEmpty(cinema)) 
            {
                int cmpy = Convert.ToInt32(cinema);
                var res =oMoviesModelClass.GetCinemaLocations(cmpy);
               
                return Json(res, JsonRequestBehavior.AllowGet);

            }
            return null;
        }

        public ActionResult GetMoviesViaLocation(string company,string location)
        {

            if (!string.IsNullOrEmpty(company) && !string.IsNullOrEmpty(location))
            {
                oGenericViewModel.cinemaCompany = company;
                int cmpy = Convert.ToInt32(company);
                if (cmpy == 3)
                {
                   
                    oGenericViewModel.ShowtimeList =  oMoviesModelClass.ListOfShowtimes(location);
                    return PartialView("_FilmHouse", oGenericViewModel);
                }
                else 
                {
                   
                    int lctn = Convert.ToInt32(location);
                    oGenericViewModel.MovieList =  oMoviesModelClass.ListofMovies(Convert.ToInt32(location));
                    return PartialView("_Others", oGenericViewModel);
                }
                

            }
            return null;
        }
    }
}
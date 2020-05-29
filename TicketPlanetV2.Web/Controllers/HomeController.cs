using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TicketPlanetV2.BAL.GenericModel.ViewModel;
using TicketPlanetV2.BAL.MovieModel;

namespace TicketPlanetV2.Web.Controllers
{
    public class HomeController : Controller
    {
        public GenericViewModel oGenericViewModel;
        public MoviesModelClass oMoviesModelClass;
        public HomeController()
        {
            oGenericViewModel = new GenericViewModel();
            oMoviesModelClass = new MoviesModelClass();
        }

        public ActionResult Index()
        {
            oGenericViewModel.sliderImages = oMoviesModelClass.GetLoadingImages();
            return View(oGenericViewModel);
        }

       
    }
}
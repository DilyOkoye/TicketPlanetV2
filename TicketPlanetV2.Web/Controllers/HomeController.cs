using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TicketPlanetV2.BAL.EventModel;
using TicketPlanetV2.BAL.GenericModel.ViewModel;
using TicketPlanetV2.BAL.MovieModel;

namespace TicketPlanetV2.Web.Controllers
{
    public class HomeController : Controller
    {
        public GenericViewModel oGenericViewModel;
        public MoviesModelClass oMoviesModelClass;
        public EventClassModel oEventClassModel;
        public HomeController()
        {
            oGenericViewModel = new GenericViewModel();
            oMoviesModelClass = new MoviesModelClass();
            oEventClassModel = new EventClassModel();
        }

        public async Task<ActionResult> Index()
        {
            oGenericViewModel.EventList = await oEventClassModel.ListofEvents();
            oGenericViewModel.sliderImages =await oMoviesModelClass.GetLoadingImages();
            return View(oGenericViewModel);
        }

       
    }
}
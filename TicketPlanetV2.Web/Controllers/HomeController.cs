using Hangfire;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TicketPlanetV2.BAL.EventModel;
using TicketPlanetV2.BAL.GenericModel.ViewModel;
using TicketPlanetV2.BAL.MovieModel;
using TicketPlanetV2.BAL.Utilities;

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
        public async Task<ActionResult> Contact()
        {
           
            return View(oGenericViewModel);
        }

        [HttpPost]
        public ActionResult Contact(string name, string emailfrom, string comment)
        {
            try
            {

                BackgroundJob.Enqueue(() => EmailNotificationMail.SendEmailContact(emailfrom, "contact@ticketplanet.ng", "Contact Us from " + name, comment, "enwakire@ticketplanet.ng;info@ticketplanet.ng", "peze@ticketplanet.ng"));
                //pascal.ezeh@ticketplanet.ng
                return Json(new { error = false,  message = "Message sent"}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

            }

            return Json(new { error = true});
        }

    }
}
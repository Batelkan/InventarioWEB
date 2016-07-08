using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventarioWEB.Controllers
{
    public class InventarioController : Controller
    {
        // GET: Inventario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ArticulosNuevos()
        {
            return PartialView();
        }

        public ActionResult Computadoras()
        {
            return PartialView();
        }

        public JsonResult GetArticulos()
        {
            var db = new InventarioDataContext();
            var articulos = db.Articulos.ToList();
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddArticulos(List<string> newArticle)
        {
            //System.Diagnostics.Debug.WriteLine("fecha: " + newArticle[11]);
            var db = new InventarioDataContext();
            var artNuevo = new Articulos();
            artNuevo.Nombre = newArticle[0];
            artNuevo.Fabricante = newArticle[1];
            artNuevo.Serie = newArticle[2];
            artNuevo.Modelo = newArticle[3];
            artNuevo.Factura = newArticle[4];
            artNuevo.Proveedor = newArticle[5];
            artNuevo.Departamento = newArticle[6];
            artNuevo.Tipo = newArticle[7];
            artNuevo.Estatus = newArticle[8];
            artNuevo.Cantidad = int.Parse(newArticle[9].ToString());
            artNuevo.CantidadDisponible = int.Parse(newArticle[9].ToString());
            artNuevo.precio = decimal.Parse(newArticle[10]);
            artNuevo.FechaAlta = DateTime.Parse(newArticle[11]);
            artNuevo.Descripcion = newArticle[12];
            artNuevo.Observaciones = newArticle[13];
            db.Articulos.InsertOnSubmit(artNuevo);

            db.SubmitChanges();
            var articulos = db.Articulos.ToList();
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteArticulos(Articulos delArticle)
        {
            //System.Diagnostics.Debug.WriteLine("ID: " + delArticle.ID);
            var db = new InventarioDataContext();
            var arti = db.Articulos.FirstOrDefault(s => s.ID == delArticle.ID);
            db.Articulos.DeleteOnSubmit(arti);
            db.SubmitChanges();

            var articulos = db.Articulos.ToList();
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditarArticulos(Articulos delArticle)
        {
            //System.Diagnostics.Debug.WriteLine("ID: " + delArticle.ID);
            var db = new InventarioDataContext();
            var arti = db.Articulos.FirstOrDefault(s => s.ID == delArticle.ID);
            var articulos = arti;
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }


    }
}
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
            //for (int i = 0; i < newArticle.Count; i++)
            //{
            //    System.Diagnostics.Debug.WriteLine("Dato " + i +" : "+ newArticle[i].ToString());
            //}

            var db = new InventarioDataContext();
            var artNuevo = new Articulos();
            artNuevo.Nombre = newArticle[0];
            artNuevo.Fabricante = newArticle[1];
            artNuevo.Serie = newArticle[2];
            artNuevo.Modelo = newArticle[3];
            artNuevo.Factura = newArticle[4];
            artNuevo.Proveedor = newArticle[5];
            artNuevo.ID_Depto = ObtenerDepto(newArticle[6]);
            artNuevo.Tipo = newArticle[7];
            artNuevo.Estatus = newArticle[8];
            artNuevo.Cantidad = int.Parse(newArticle[9].ToString());
            artNuevo.CantidadDisponible = int.Parse(newArticle[9].ToString());
            artNuevo.precio = decimal.Parse(newArticle[10]);
            artNuevo.Descripcion = newArticle[11];
            artNuevo.Observaciones = newArticle[12];
            db.Articulos.InsertOnSubmit(artNuevo);

            db.SubmitChanges();
            var articulos = db.Articulos.ToList();
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }

        public int ObtenerDepto(string depto)
        {
            using (InventarioDataContext db = new InventarioDataContext())
            {
                
                var dept = (from a in db.Departamentos
                             where a.Nombre == depto.ToUpper()
                             select a.ID).Single();
                return int.Parse(dept.ToString());
            }
                
        }


    }
}
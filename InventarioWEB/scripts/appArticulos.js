
app.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});

app.controller('AgregarArticulo', function ($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {

    var iself = this;

    $scope.categoria = [
     "RAM",
     "CPU",
     "FUENTES DE PODER",
     "LIMPIEZA",
     "ALMACENAMIENTO"
    ];

    $scope.deptos = [
      "Arquitectura",
      "Tesoreria",
      "Legal",
      "Cobranza",
      "Recursos Humanos",
      "Proyectos",
      "Servicios",
      "Informatica",
      "Administrativo"
    ];

    $scope.estatus = [
      "Disponible",
      "Ocupado",
      "Baja"
    ];

    $scope.articuloID = "";
    $scope.articuloNombre = "";
    $scope.articuloFabricante = "";
    $scope.articuloSerie = "";
    $scope.articuloModelo = "";
    $scope.articuloFactura = "";
    $scope.articuloProveedor = "";
    $scope.articuloDepto = "";
    $scope.articuloCategoria = "";
    $scope.articuloEstatus = "";
    $scope.articuloCantidad = 1;
    $scope.articuloPrecio = 1.0;
    $scope.articuloFecha = new Date();
    $scope.articuloDescripcion = "";
    $scope.articuloObservaciones = "";

    $http.get('/Inventario/GetArticulos')
    .success(function (result) { $scope.articulos = result; })
    .error(function (noResult) { console.log(noResult); }); 

    $scope.agregarArticulo = function () {
        $scope.nuevoArticulo = [
                  $scope.articuloNombre,
                  $scope.articuloFabricante,
                  $scope.articuloSerie,
                  $scope.articuloModelo,
                  $scope.articuloFactura,
                  $scope.articuloProveedor,
                  $scope.articuloDepto,
                  $scope.articuloCategoria,
                  $scope.articuloEstatus,
                  $scope.articuloCantidad,
                  $scope.articuloPrecio,
                  ($scope.articuloFecha.getDate() + '/' + ($scope.articuloFecha.getMonth() + 1) + '/' + $scope.articuloFecha.getFullYear()),
                  $scope.articuloDescripcion,
                  $scope.articuloObservaciones
        ]
      
        $http.post('/Inventario/AddArticulos', JSON.stringify($scope.nuevoArticulo, function (key, value) {
            if (typeof value === 'string') {
                var d = /\/Date\((\d*)\)\//.exec(value);
                return (d) ? new Date(+d[1]) : value;
            }
            return value;
        }))//FuctionRetriver para la fecha
        .success(function (result) {

            $scope.articulos = result;
            $scope.nuevoArticulo = [];
            iself.reset();
            ////$scope.frmArticulos.articuloDescripcion.$touched = false;
        })
        .error(function (noResult) { console.log(noResult); });
    };

    iself.reset = function () {
        $scope.articuloID = '';
        $scope.articuloNombre = '';
        $scope.articuloFabricante = '';
        $scope.articuloSerie = '';
        $scope.articuloModelo = '';
        $scope.articuloFactura = '';
        $scope.articuloProveedor = '';
        $scope.articuloDepto = '';
        $scope.articuloCategoria = '';
        $scope.articuloEstatus = '';
        $scope.articuloCantidad = 1;
        $scope.articuloPrecio = 1.0;
        $scope.articuloFecha = new Date();
        $scope.articuloDescripcion = '';
        $scope.articuloObservaciones = '';
        $scope.frmArticulos.$setPristine();
    }


    $scope.BorrarArticulo = function (articulo) {

        $http.post('/Inventario/DeleteArticulos', JSON.stringify(articulo, function (key, value) {
            if (typeof value === 'string') {
                var d = /\/Date\((\d*)\)\//.exec(value);
                return (d) ? new Date(+d[1]) : value;
            }
            return value;
        }))//FuctionRetriver para la fecha
        .success(function (result) {
            $scope.articulos = result;
        })
        .error(function (noResult) { console.log(noResult); });
    };

    $scope.EditarArticulo = function (articulo) {

        $http.post('/Inventario/EditarArticulos', JSON.stringify(articulo, function (key, value) {
            if (typeof value === 'string') {
                var d = /\/Date\((\d*)\)\//.exec(value);
                return (d) ? new Date(+d[1]) : value;
            }
            return value;
        }))//FuctionRetriver para la fecha
        .success(function (result) {
            $scope.articuloID = result.ID;
            $scope.articuloNombre = result.Nombre;
            $scope.articuloFabricante = result.Fabricante;
            $scope.articuloSerie = result.Serie;
            $scope.articuloModelo = result.Modelo;
            $scope.articuloFactura = result.Factura;
            $scope.articuloProveedor = result.Proveedor;
            $scope.articuloDepto = result.Departamento;
            $scope.articuloCategoria = result.Tipo;
            $scope.articuloEstatus = result.Estatus;
            $scope.articuloCantidad = result.Cantidad;
            $scope.articuloPrecio = result.precio;
            $scope.articuloFecha = ConvertirFecha(result.FechaAlta);
            $scope.articuloDescripcion = result.Descripcion;
            $scope.articuloObservaciones = result.Observaciones;
            
        })
        .error(function (noResult) { console.log(noResult); });
    };

    ConvertirFecha = function (value) {
            if (typeof value === 'string') {
                var d = /\/Date\((\d*)\)\//.exec(value);
                return (d) ? new Date(+d[1]) : value;
            }
            return value;
    }

    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withLanguageSource('//cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json');

    $scope.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3),
      DTColumnDefBuilder.newColumnDef(4),
      DTColumnDefBuilder.newColumnDef(5),
      DTColumnDefBuilder.newColumnDef(6),
      DTColumnDefBuilder.newColumnDef(7),
      DTColumnDefBuilder.newColumnDef(8).withClass('none'),
      DTColumnDefBuilder.newColumnDef(9).withClass('none'),
      DTColumnDefBuilder.newColumnDef(10).withClass('none'),
      DTColumnDefBuilder.newColumnDef(11).withClass('none'),
      DTColumnDefBuilder.newColumnDef(12).withClass('none'),
      DTColumnDefBuilder.newColumnDef(13).withClass('none'),
      DTColumnDefBuilder.newColumnDef(14).withClass('none'),
      DTColumnDefBuilder.newColumnDef(15),
      
    ];
});


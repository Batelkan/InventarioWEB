var app = angular.module("inventApp", ['ngMaterial', 'ngRoute', 'datatables','ngMessages']);



app.controller('mainController', function ($scope) {

});


app.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});

app.controller('AgregarArticulo', function ($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.categoria = [
     "RAM",
     "CPU",
     "FUENTES DE PODER",
     "LIMPIEZA"
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
    $scope.articuloDescripcion = "";
    $scope.articuloObservaciones = "";

    $http.get('/Inventario/GetArticulos')
    .success(function (result) { $scope.articulos = result; })
    .error(function (noResult) { console.log(noResult);});

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
                  $scope.articuloDescripcion,
                  $scope.articuloObservaciones]

        $http.post('/Inventario/AddArticulos', JSON.parse($scope.nuevoArticulo, function (key,value) {
            if (typeof value === 'string') {
                var d = /\/Date\((\d*)\)\//.exec(value);
                return (d) ? new Date(+d[1]) : value;
            }
            return value;
        }))//FuctionRetriver para la fecha
        .success(function (result) {

            $scope.articulos = result;
            $scope.nuevoArticulo = [];
            $scope.articuloNombre = "";
            $scope.articuloFabricante = "";
            $scope.articuloSerie = "";
            $scope.articuloModelo = "";
            $scope.articuloFactura = "";
            $scope.articuloProveedor = "";
            $scope.articuloDepto = "";
            $scope.articuloCategoria = 0;
            $scope.articuloEstatus = "";
            $scope.articuloCantidad = 0;
            $scope.articuloPrecio = 0.0;
            $scope.articuloDescripcion = "";
            $scope.articuloObservaciones = "";
        })
        .error(function (noResult) { console.log(noResult); });
    };

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
      DTColumnDefBuilder.newColumnDef(15)
    ];
});



app.controller('AgregarComputadora', function ($scope) {



});

app.controller('formArticulosCtrl', function ($scope) {
    $scope.categoria = [
      "RAM",
      "CPU",
      "FUENTES DE PODER",
      "LIMPIEZA"
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



})

app.controller('formComputadoraCtrl', function ($scope) {
    $scope.categoria = [
      "Laptop",
      "Escritorio"
    ];

    $scope.deptos = [
      "Arquitectura",
      "Tesoreria",
      "Legal",
      "Cobranza",
      "Recursos Humanos",
      "Proyectos",
      "Servicios",
      "Soporte",
      "Administrativo"
    ];

    $scope.estatus = [
      "Disponible",
      "Ocupado",
      "Baja"
    ];

    $scope.ngScrollConfLight = {
        autoHideScrollbar: false,
        theme: 'light',
        advanced: {
            updateOnContentResize: true
        },
        setHeight: 200,
        scrollInertia: 0
    };

    $scope.ngScrollConfDark = {
        autoHideScrollbar: false,
        theme: 'dark',
        advanced: {
            updateOnContentResize: true
        },
        setHeight: 200,
        scrollInertia: 0
    };

})


app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('TemaDark')
    .primaryPalette('grey', {
        'default': '800', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('yellow', {
        'default': '500' // use shade 200 for default, and keep all other shades the same
    });
})




app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
      
      $routeProvider.when('/', {
          templateUrl: '/Inventario/ArticulosNuevos',
          controller: 'AgregarArticulo'
      });

      $routeProvider.when('/ArticulosNuevos', {
          templateUrl: '/Inventario/ArticulosNuevos',
          controller: 'AgregarArticulo',
      });
      $routeProvider.when('/Computadoras', {
          templateUrl: '/Inventario/Computadoras',
          controller: 'AgregarComputadora',
      });
        $routeProvider.otherwise({
            redirectTo: '/Inventario/ArticulosNuevos',
            controller: 'AgregarArticulo'
        });

      // Specify HTML5 mode (using the History APIs) or HashBang syntax.
        $locationProvider.html5Mode(false).hashPrefix('!');

  }]);


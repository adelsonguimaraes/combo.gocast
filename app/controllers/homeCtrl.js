angular.module(module).controller('homeCtrl', function ($rootScope, $scope, authenticationAPI, genericAPI, $location, SweetAlert, $uibModal, $timeout) {
    
    $scope.title = '';

    // tab ativa
    $scope.tab = 'internet';

    // lista de planos de internet residencial
    $scope.planosInternetResidencial = [
        {
            titulo: '30 Mega',
            detalhes: 'Modem com Wifi Turbo, Download: 30 Mbps, Upload 10 Mbps',
            fidelidade: '12 Meses',
            valor: 99.00,
            posfidelidade: '*Após 1 ano 30 Mega R$149,90',
            tipo: 'residencial',
            selecionado: false
        },
        {
            titulo: '60 Mega',
            detalhes: 'Modem com Wi-fi Turbo, Download: 60 Mbps, Upload: 20 Mbps',
            fidelidade: '12 Meses',
            valor: 129.90,
            posfidelidade: '*Após 1 ano 60 mega R$ 179,00',
            tipo: 'residencial',
            selecionado: false
        }
    ];

    // lista de planos de internet empresarial
    $scope.planosInternetEmpresarial = [
        {
            titulo: '30 Mega',
            detalhes: 'Modem com Wifi Turbo, Download: 30 Mbps, Upload 10 Mbps',
            fidelidade: '12 Meses',
            valor: 129.90,
            posfidelidade: '*Após 1 ano 30 Mega R$179,90',
            tipo: 'empresarial'
        },
        {
            titulo: '60 Mega',
            detalhes: 'Modem com Wi-fi Turbo, Download: 60 Mbps, Upload: 20 Mbps',
            fidelidade: '12 Meses',
            valor: 159.90,
            posfidelidade: '*Após 1 ano 60 mega R$ 179,00',
            tipo: 'empresarial'
        }
    ];

    // lista de planos de tv
    $scope.planosTv = [
        {
            titulo: 'Plano Start',
            detalhes: '31 Canais',
            valor: 59.90,
            posfidelidade: '*Após 1 Ano R$69,90',
            selecionado: false
        },
        {
            titulo: 'Plano Max',
            detalhes: '50 Canais',
            valor: 84.90,
            posfidelidade: '*Após 1 Ano R$94,90',
            selecionado: false
        },
        {
            titulo: 'Plano Plus',
            detalhes: '75 Canais',
            valor: 129.90,
            posfidelidade: '*Após 1 Ano R$139,90',
            selecionado: false
        },
        {
            titulo: 'Plano Prime',
            detalhes: '85 Canais',
            valor: 179.90,
            posfidelidade: '*Após 1 Ano R$189,90',
            selecionado: false
        }
    ]

    $scope.total = 0;

    $scope.selecionaInternet = function (obj) {
        if (!obj.selecionado) {
            for (f of $scope.planosInternetResidencial) {
                f.selecionado = false;
            }
            obj.selecionado = true;

            MyToast.show('Plano de Internet ' + obj.titulo + ' Selecionado');
        }else{
            obj.selecionado = false;
        }
        
        totalizador();
    }

    $scope.selecionaTv = function (obj) {
        if (!obj.selecionado) {
            for (f of $scope.planosTv) {
                f.selecionado = false;
            }
            obj.selecionado = true;

            MyToast.show('Plano de TV ' + obj.titulo + ' Selecionado');
        }else{
            obj.selecionado = false;
        }
        
        totalizador();
    }

    function totalizador () {
        $scope.total = 0;
        var internet = false;
        for (f of $scope.planosInternetResidencial) {
            if (f.selecionado) {
                $scope.total += parseFloat(f.valor);
                internet = true;
            }
        }
        for (f of $scope.planosTv) {
            if (f.selecionado) {
                $scope.total += parseFloat(f.valor);
                if (internet) $scope.total += -10;
            }
        }
    }

    $scope.finalizar = function () {
        for (f of $scope.planosInternetResidencial) {
            if (f.selecionado) {
                console.log(f.titulo);
            }
        }
        for (f of $scope.planosTv) {
            if (f.selecionado) {
                console.log(f.titulo);
            }
        }
    }
    
});
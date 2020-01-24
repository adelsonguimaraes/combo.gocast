angular.module(module).controller('homeCtrl', function ($rootScope, $scope, authenticationAPI, genericAPI, $location, SweetAlert, $uibModal, $timeout, $stateParams) {
    
    $scope.title = '';

    // tab ativa
    $scope.tab = 'internet';
    $scope.clickTab = function (tab) {
        $scope.tab = tab;
    }

    // getando parametros da URL
    $scope.params = $stateParams;

    $scope.tabparams = window.location.hash.substr(window.location.hash.indexOf('?'));

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

    // lista de planos adicionais
    $scope.planosAdicionais = [
        {
            titulo: 'Ponto Adicional 1',
            detalhes: '1 Ponto Adicional de TV',
            valor: 29.90,
            selecionado: false
        },
        {
            titulo: 'Ponto Adicional 2',
            detalhes: '2 Pontos Adicional de TV',
            valor: 59.90,
            selecionado: false
        },
        {
            titulo: 'Ponto Adicional 3',
            detalhes: '3 Pontos Adicional de TV',
            valor: 89.70,
            selecionado: false
        }
    ]

    $scope.total = 0;
    $scope.combo = [];
    var internet = false;
    var tv = false;

    $scope.selecionaInternet = function (obj) {
        if (!obj.selecionado) {
            for (f of $scope.planosInternetResidencial) {
                f.selecionado = false;
            }
            obj.selecionado = true;

            MyToast.show('Plano de Internet ' + obj.titulo + ' Selecionado');
        }else{
            obj.selecionado = false;
            MyToast.show('Plano de Internet ' + obj.titulo + ' Removido');
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
            MyToast.show('Plano de Internet ' + obj.titulo + ' Removido');
            for (f of $scope.planosAdicionais) f.selecionado = false;
        }
        
        totalizador();
    }

    $scope.selecionaAdicional = function (obj) {
        if (!tv) return SweetAlert.swal({ html: true, title: "Atenção", text: "Selecione um plano de TV para adicionar ponto.", type: "error" });

        if (!obj.selecionado) {
            for (f of $scope.planosAdicionais) {
                f.selecionado = false;
            }
            obj.selecionado = true;

            MyToast.show(obj.titulo + ' Selecionado');
        }else{
            obj.selecionado = false;
            MyToast.show(obj.titulo + ' Removido');
        }
        
        totalizador();
    }

    function totalizador () {
        $scope.total = 0;
        $scope.combo = [];
        internet = false;
        for (f of $scope.planosInternetResidencial) {
            if (f.selecionado) {
                $scope.total = (parseFloat($scope.total) + parseFloat(f.valor)).toFixed(2);
                var copy = angular.copy(f);
                copy.titulo = 'Internet - ' + copy.titulo;
                $scope.combo.push(copy);
                internet = true;
            }
        }
        tv = false;
        for (f of $scope.planosTv) {
            if (f.selecionado) {
                $scope.total = (parseFloat($scope.total) + parseFloat(f.valor)).toFixed(2);
                var copy = angular.copy(f);
                copy.titulo = 'TV - ' + copy.titulo;
                $scope.combo.push(copy);
                tv = true;
            }
        }
        for (f of $scope.planosAdicionais) {
            if (f.selecionado) {
                $scope.total = (parseFloat($scope.total) + parseFloat(f.valor)).toFixed(2);
                var copy = angular.copy(f);
                copy.titulo = copy.titulo;
                $scope.combo.push(copy);
            }
        }

        // calculo de desconto do valor
        // se no combo possuir Internet e TV
        if (internet && tv) $scope.total = (parseFloat($scope.total) - parseFloat(-10)).toFixed(2);
    }

    $scope.finalizar = function () {
        $('.nav-tabs a[href="e#form"]').tab('show');
        $scope.tab = 'form';
    }

    $scope.solicitar = function (obj) {
        console.log($scope.combo);
        console.log(obj);
    }
    
});
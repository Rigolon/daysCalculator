var configHttp = {
    emulateHTTP: true,
    emulateJSON: true
};

var moneyConfig = {
    decimal: ',',
    thousands: '.',
    prefix: 'Days ',
    suffix: '',
    precision: 8,
    masked: false
};

new Vue({
    i18n,
    el: "#app",
    data: {
        bigNumber: BigNumber,
        money: moneyConfig,    
        active: 'tab-01',
        loadingFeedback: false,
        menu: false,
        message: "",
        calcLoading: false,
        config: {
            chronoEraStep: 88
        },
        form: {
            cicle: 88,
            min: 1,
            max: 3333,
            etherium: null,
            timeMint: null,
            chronoPower: null,
            tokensDayZero: null,
            etheriumAddress: null
        },
        maxDays: 90,
        valueInitial: 0,
        chronoEra: {},
        page: 1,
        pagination: 50,
        url: "https://etherchain.org/api/account/0xA723606e907bF84215d5785Ea7f6cD93A0Fbd121/tx/",
        transactions: [],
        transactionsAgrouped: {},
        startDateEffective: "2017-09-19",
        startDate1Ico: '2017-08-28T13:00:00.000Z',
        startDate2Ico: '2017-08-28T19:00:00.000Z',
        amountStartDate: 5,
        simulationDays: [],
        faq:[{
                title: "whenStart",
                text: "within15day"
            },
            {
                title: "whyAreNoDay",
                text: "tokensNotBeen"
            },
            {
                title: "qualMyChronoPower",
                text: "estimateLookingEtherScan"
            },
            {
                title: "canIStillContrib",
                text: "noYourContribBeLost"
            },
            {
                title: "canITopUpNow",
                text: "noYourContribBeLostDoNotAttemp"
            },
            {
                title: "beCareful",
                text: "beCarefulWhenClick"
            },
            {
                title: "discussSlack",
                text: "shillingOwnProject"
            }
        ]
    },

    mounted: function mounted() {
        var self = this;
        var tmp = {};
        var getAddress = window.location.pathname.replace('/', '');

        for (i = 1; i <= 40; i++) {
            
            var BG = null;
            if(i == 1)
            {
                BG = new BigNumber(1);
            } else {
                BG = new BigNumber(tmp[i - 1].effective.dividedBy(2));
            }

            tmp[i] = {
                era: Math.ceil(i / 4),
                initDay: self.config.chronoEraStep * i - self.config.chronoEraStep + 1,
                lastDay: self.config.chronoEraStep * i,
                effective: new BigNumber(BG)
            };
        };

        self.chronoEra = tmp;
        self.setTimemints();
        self.createSimulationDays();
        /* self.getTransactions(1); */

        if(getAddress.length === 42)
        {
            this.form.etheriumAddress = getAddress;
            this.getAddress();
        }
    },

    methods: {

        next: function next(){
            this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length];
        },

        send: function()
        {
            var self = this;

            if(!!self.message.trim())
            {
                var data = {
                    message: self.message.trim()
                };

                self.loadingFeedback = true;

                self.$http.post('/contact.php', data, configHttp).then( function(r){
                    if(r.body.status)
                    {
                        swal(msgSuccess, msgSuccessText, 'success').catch(swal.noop);
                        self.message = '';
                        self.loadingFeedback = false;
                        self.menu = false;
                    }
                }, function(err){
                    swal(Oops, msgErrorText, 'error').catch(swal.noop);
                    self.message = '';
                    self.loadingFeedback = false;
                    self.menu = false;
                });
            }            
        },

        getAddress: function getAddress() {

            var self = this;
            var my_timemint = null;

            if( String(self.form.etheriumAddress).length == 42 ){
                my_timemint = timemints.filter(function(item){return item.address == self.form.etheriumAddress });
            }

            if(my_timemint !== null && !!my_timemint[0])
            {
                this.form.etheriumAddress = String(my_timemint[0].address);
                this.form.etherium = String(my_timemint[0].eth);
                this.form.timeMint = String(my_timemint[0].timemint);
                this.formEtherium(this.form.etherium);
            } else {
                if (!!this.form.etheriumAddress) {
                    swal('Oops..', msgAlert, 'error').catch(swal.noop);
                    this.form.etheriumAddress = null;
                }
            }
        },

        getDay: function getDay(day)
        {
            var calc = moment(this.startDateEffective).add(day-1, 'days').format(this.dateFormat);
            return calc;
        },

        setTimemints: function setTimemints() {
            this.transactionsAgrouped = timemints;
        },

        getTransactions: function getTransactions(page) {
            var self = this;
            var address = self.url;
            var offset = self.pagination * page - self.pagination;

            this.$http.get(address + offset).then(function (response) {

                if (response.body.data.length) {
                    self.transactions = self.transactions.concat(response.body.data);
                    setTimeout(function () {
                        self.getTransactions(page + 1);
                    }, 10000);
                } else {
                    console.log(self.transactions);
                }
            }, function (response) {
                // error callback
            });
        },

        getPositionsTransaction: function getPositionsTransaction() {
            var self = this;
            var localTransactions = transactions;
            var tmp = {};

            for (var i = 0; i < localTransactions.length; i++) {
                var valid = false;
                var _t = localTransactions[i];

                _t.amountFormated = _t.amount / 1000000000000000000;

                if (moment(_t.time).isSameOrAfter(self.startDate1Ico) && _t.amountFormated >= 5) {
                    valid = true;
                }

                if (!valid && moment(_t.time).isSameOrAfter(self.startDate2Ico) && _t.amountFormated >= 1) {
                    valid = true;
                } else {
                    if (tmp[_t.sender] !== undefined) {
                        valid = true;
                    }
                }

                if( valid )
                {
                    if(_t.gasLimit == _t.gasUsed)
                    {
                        valid = false;
                    }
                }

                if (valid) {
                    if (tmp[_t.sender] === undefined) {
                        tmp[_t.sender] = Array();
                    }

                    tmp[_t.sender].push(_t);
                }
            };

            // Sort
            tmp = _.fromPairs(_.sortBy(_.toPairs(tmp), function(a){return new Date(a.time) }).reverse());

            self.transactionsAgrouped = tmp;
        },

        formEtherium: function formEtherium(value) {
            var n = Number(String(value).replace(',', '.'));
            if (!!n) {

                if(n < 1)
                {
                    swal("Oops", msgAlert2, 'error').catch(swal.noop);
                    this.form.etherium = null;
                    this.form.chronoPower = null;
                    this.form.tokensDayZero = null;
                } else {
                    var calc = Number( (n * 24) );
                    this.form.tokensDayZero = calc;
                }
            } else {
                this.form.etherium = null;
                this.form.chronoPower = null;
                this.form.tokensDayZero = null;
            }
        },

        createSimulationDays: function createSimulationDays()
        {
            var self = this;
            var tmp = [];

            for(i=1; i<=self.maxDays; i++){

                tmp.push({
                    day: moment(self.startDateEffective).add(i-1, 'days').format(self.dateFormat),
                    value: 0,
                    deposit: "0,00",
                    effective: 0,
                    gain: 0,
                    valueTotal: 0,
                });
            }

            self.simulationDays = tmp;
        },

        calculateDays: function calculateDays()
        {
            var self = this;
            var value = 0;
            var step = self.config.chronoEraStep;

            for(i in self.simulationDays){

                var dayFromStart = moment(self.simulationDays[i].day, self.dateFormat).diff(moment(self.startDateEffective), 'days') + 1;
                var getPercent = Math.ceil(dayFromStart / step);                
                var effective = new BigNumber(self.simulations[getPercent-1].chronoPower);

                if(i == 0){
                    value = new BigNumber(self.form.tokensDayZero);
                } else {
                    value = new BigNumber(self.simulationDays[i-1].valueTotal);
                }

                // Add Deposit
                var deposit = new BigNumber(Number(self.simulationDays[i].deposit.replace(',', '.')));

                if(deposit > 0){
                    value = deposit.plus(value);
                }
                
                var gainDay = new BigNumber(value).div(100).mul(effective);
                var valueTotal = new BigNumber(value).plus(gainDay);

                self.simulationDays[i].valueTotal = new BigNumber(valueTotal);
                self.simulationDays[i].value = new BigNumber(value);
                self.simulationDays[i].gain = new BigNumber(gainDay);
                self.simulationDays[i].effective = new BigNumber(effective);
            }
        }

    },

    watch: {

        'form.timeMint': function formTimeMint(value) {
            var self = this;

            if (Number(value) < this.form.min) {
                self.$nextTick(function () {
                    this.form.timeMint = this.form.min;
                });
                return;
            }

            if (Number(value) > this.form.max) {
                self.$nextTick(function () {
                    this.form.timeMint = this.form.max;
                });
                return;
            }

            var n = Number(value);
            if (!!n) {
                var calc = new BigNumber(n-1).div(3332).mul(0.005).minus(0.01).mul(100);                
                this.form.chronoPower = new BigNumber(calc).abs();
            }
        }

    },

    computed: {

        dateFormat: function dateFormat()
        {
            var get = this.$t('dateFormat');

            if(get === 'dateFormat')
            {
                get = "YYYY-MM-DD";
            }

            return get;
        },

        simulations: function simulations() {
            var tmp = [],
                self = this;

            if (!!self.form.timeMint && !!self.form.chronoPower) {
                self.calcLoading = true;
                var value = new BigNumber(self.form.tokensDayZero);

                for (item in self.chronoEra) {
                    var chronoEra = self.chronoEra[item];
                    var start = value;

                    if (item > 1) {
                        if (chronoEra[item - 2] !== undefined) {
                            value = new BigNumber(value).plus(chronoEra[item - 2].diff);
                        }
                        start = new BigNumber(tmp[item - 2].last);
                    }

                    var percent1 = new BigNumber(chronoEra.effective);
                    var percent2 = new BigNumber(this.form.chronoPower);
                    var calcPercent = new BigNumber(percent1).mul(percent2); //Math.pow(percent2, self.config.chronoEraStep) * percent1;                    
                    
                    var number01 = new BigNumber(calcPercent).div(100).plus(1);
                    var percentCumulative = new BigNumber(number01).pow(new BigNumber(self.config.chronoEraStep));                    
                    var valueCumulative = new BigNumber(start).mul(percentCumulative);

                    tmp.push({
                        chronoPower: calcPercent,
                        period: item,
                        start: new BigNumber(start),
                        last: valueCumulative,
                        diff: new BigNumber(valueCumulative).minus(start)
                    });
                }
            }

            self.calcLoading = false;

            return tmp;
        },

        canSimulate: function canSimulate()
        {
            var check = !!this.form.etherium && !!this.form.chronoPower && !!this.form.tokensDayZero;
            return check;
        }

    }

});


/* Config Math */
BigNumber.config({
    DECIMAL_PLACES: 18,
    RANGE: 9,
    ERRORS: false
});

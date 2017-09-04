new Vue({
    el: "#app",
    data: {
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
        chronoEra: {},
        page: 1,
        pagination: 50,
        url: "https://etherchain.org/api/account/0xA723606e907bF84215d5785Ea7f6cD93A0Fbd121/tx/",
        transactions: [],
        transactionsAgrouped: {},
        startDate1: '2017-08-28T13:00:00.000Z',
        startDate2: '2017-08-28T19:00:00.000Z',
        amountStartDate: 5
    },

    mounted: function mounted() {
        var self = this;
        var tmp = {};

        for (i = 1; i <= 40; i++) {
            tmp[i] = {
                era: Math.ceil(i / 4),
                initDay: self.config.chronoEraStep * i - self.config.chronoEraStep + 1,
                lastDay: self.config.chronoEraStep * i,
                effective: i == 1 ? 1 : tmp[i - 1].effective / 2
            };
        };

        self.chronoEra = tmp;
        self.getPositionsTransaction();
        /* self.getTransactions(1); */
    },

    methods: {

        getAddress: function getAddress() {
            if (!!this.transactionsAgrouped[this.form.etheriumAddress]) {
                var total = 0.00;
                var lt = this.transactionsAgrouped[this.form.etheriumAddress];

                for (i = 0; i < lt.length; i++) {
                    total += lt[i].amountFormated;
                }

                this.form.etherium = String(total);
                this.form.timeMint = Object.keys(this.transactionsAgrouped).indexOf(this.form.etheriumAddress) + 1;
            } else {
                if (!!this.form.etheriumAddress) {
                    swal('Oops..', msgAlert, 'error').catch(swal.noop);
                    this.form.etheriumAddress = null;
                }
            }
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

                if (moment(_t.time).isSameOrAfter(self.startDate1) && _t.amountFormated >= 5) {
                    valid = true;
                }

                if (!valid && moment(_t.time).isSameOrAfter(self.startDate2) && _t.amountFormated >= 1) {
                    valid = true;
                } else {
                    if (tmp[_t.sender] !== undefined) {
                        valid = true;
                    }
                }

                if (valid) {
                    if (tmp[_t.sender] === undefined) {
                        tmp[_t.sender] = Array();
                    }

                    tmp[_t.sender].push(_t);
                }
            };

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
                    var calc = n * 24;
                    this.form.tokensDayZero = calc;
                }
            } else {
                this.form.etherium = null;
                this.form.chronoPower = null;
                this.form.tokensDayZero = null;
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
                var calc = 0.01 - 0.005 * (n - 1) / 3332;
                this.form.chronoPower = String(calc * 100);
            }
        }
    },

    computed: {
        simulations: function simulations() {
            var tmp = [],
                self = this;

            if (!!self.form.timeMint && !!self.form.chronoPower) {
                self.calcLoading = true;
                var value = self.form.tokensDayZero;

                for (item in self.chronoEra) {
                    var chronoEra = self.chronoEra[item];
                    var start = value;

                    if (item > 1) {
                        if (chronoEra[item - 2] !== undefined) {
                            value += chronoEra[item - 2].diff;
                        }
                        start = tmp[item - 2].last;
                    }

                    var percent1 = chronoEra.effective;
                    var percent2 = this.form.chronoPower;
                    var calcPercent = percent1 * percent2; //Math.pow(percent2, self.config.chronoEraStep) * percent1;
                    var percentCumulative = Math.pow(1 + calcPercent / 100, self.config.chronoEraStep);
                    var valueCumulative = start * percentCumulative;

                    tmp.push({
                        chronoPower: calcPercent,
                        period: item,
                        start: Number(start),
                        last: valueCumulative,
                        diff: valueCumulative - start
                    });
                }
            }

            self.calcLoading = false;

            return tmp;
        }
    }
});

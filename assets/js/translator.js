function language()
{
    var langDefault = 'en';
    var langOptions = [langDefault, 'pt-BR'];
    var browserLanguage = navigator.language || navigator.userLanguage || langDefault;

    if(langOptions.indexOf(browserLanguage) === -1){
        browserLanguage = langDefault;
    }

    if(browserLanguage.search(/^en/) === 0) { browserLanguage = 'en'; }
    if(browserLanguage.search(/^pt/) === 0) { browserLanguage = 'pt'; }

    return browserLanguage;
}

var localeStrings = {
    en: {
        flag: 'us',
        us: "English",
        br: "Portuguese",

        dateFormat: "YYYY-MM-DD",
        calcDayTokens: "Day Tokens Calculator",
        feedback: "feedback",
        sendFeedback: "Send your FeedBack",
        writeMessage: "Write your message and click on send",
        send: "Send",
        infoTableChrono: "Information based on the table provided by Chrono Logic in this",
        typeAdressEth: "Type your address Ethereum or fill the fields below",
        seeTable: "If you want to see the available table",
        clickHere: "Click here",
        ethInitial: "Ethereum initial investment",
        ethInvest: "Ethereum initial investment",
        typeSeparator: "Enter the decimal separator as a comma or dot. Do not use a thousand separator.",
        numberTimemint: "Type your TimeMint number",
        typeYourTimemint: "Enter your TimeMint to view your ChronoPower",
        days0: "Days Tokens no Dia 0",
        typeEthDay0: "Enter your ETH investment to view your DAYS on day 0",
        simulation: "Simulation",
        periods: "Periods",
        year: "Year",
        cicle: "Cicle",
        start: "Start",
        end: "End",
        effective: "Effectiveness",
        chronoEra: "ChronoEra",
        chronoPower: "ChronoPower",
        vlSta: "Value initial",
        vlEnd: "Valor final",
        winPeriod: "gain on period",
        formType: "Fill out the form to view the simulation",
        codeInGit: "Code disponible in",
        day: "Day",
        value: "Value",
        gain: "Gain Daily",
        effective: "Effectiveness",
        deposit: "Deposit",
        simulationInDays: 'Simulation Days',
        valueTotal: 'Total value',
        simulate90Days: "Simulation of 90 days. To start the calculation, click the button below.",
        calc: 'Calculate',
        selectYourLanguage: "Select your language"
    },
    pt: {
        flag: 'br',
        us: "Inglês",
        br: "Português",

        dateFormat: "DD/MM/YYYY",
        calcDayTokens: "Calculadora de Day Tokens",
        feedback: "feedback",
        sendFeedback: "Envie seu FeedBack",
        writeMessage: "Escreva sua mensagem e clique em enviar",
        send: "Enviar",
        infoTableChrono: "Informações baseadas na tabela disponibilizada pela Chrono Logic neste",
        typeAdressEth: "Digite seu Endereço Ethereum ou preencha os campos abaixo",
        seeTable: "Caso queira visualizar a tabela disponibilizada",
        clickHere: "clique aqui",
        ethInitial: "Ethereum inicial de Investimento",
        ethInvest: "Ethereum inicial de Investimento",
        typeSeparator: "Digite o separador decimal como uma vírgula ou ponto. Não use separador de milhar.",
        numberTimemint: "Digite o número da sua TimeMint",
        typeYourTimemint: "Digite sua TimeMint para visualizar sua ChronoPower",
        days0: "Days Tokens no Dia 0",
        typeEthDay0: "Digite o ETH de investimento para visualizar seus DAYS no dia 0",
        simulation: "Simulação",
        periods: "Períodos",
        year: "Ano",
        cicle: "Ciclo",
        start: "Início",
        end: "Fim",
        effective: "Efetividade",
        chronoEra: "ChronoEra",
        chronoPower: "ChronoPower",
        vlSta: "Valor Inicial",
        vlEnd: "Valor Final",
        winPeriod: "Ganho no período",
        formType: "Preencha o formulário para visualizar a simulação",
        codeInGit: "Código disponível no",
        day: "Dia",
        value: "Valor",
        gain: "Ganho diário",
        effective: "Efetividade",
        deposit: "Depósito",
        simulationInDays: 'Simulação em dias',
        valueTotal: 'Valor total',
        simulate90Days: "Simulação de 90 dias. Para iniciar o cálculo, clique no botão abaixo.",
        calc: 'Calcular',
        selectYourLanguage: "Selecione seu idioma"
    }
};

var i18n = new VueI18n({
    locale: language(),
    messages: localeStrings,
});

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
        typeAdressEth: "Type your Ethereum address or fill the fields below",
        seeTable: "If you want to see the available table",
        clickHere: "Click here",
        ethInitial: "Ethereum Initial Investment",
        ethInvest: "Ethereum Initial Investment",
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

        selectYourLanguage: "Select your language",
        whenStart: "When will minting start?",
        within15day: "Within 15 days of the contribution period ending meaning planned for September 15th.",
        whyAreNoDay: "Why are there no DAY tokens at my ETH address?",
        tokensNotBeen: "Tokens have not been distributed yet. Please see answer above.",
        qualMyChronoPower: "What is my ChronoPower?",
        estimateLookingEtherScan: "Please estimate it by looking at etherscan as all of the TimeMints will be allocated according to ChronoLogic order: https://etherscan.io/address/0xa723606e907bf84215d5785ea7f6cd93a0fbd121",
        canIStillContrib: "Can I still contribute?",
        noYourContribBeLost: "No. Your contribution would be lost. Please do not contribute.",
        canITopUpNow: "Can I top up now?",
        noYourContribBeLostDoNotAttemp: "No. Your contribution would be lost. Do not attempt to top up. Please do not try to top up.",
        beCareful: "What should I be careful about?",
        beCarefulWhenClick: "Be careful when clicking links or opening random files in Slack or whenever you receive a direct message. A few people have already been scammed. Any info we need to communicate with you will be at the blog https://blog.chronologic.network",
        discussSlack: "What can I discuss in Slack?",
        shillingOwnProject: "Anything just no shilling of your own projects please.",
        coffe: "Buy me a coffe",
        coffe_address: "0x1c58cacec962ad140d75ffe6daa97056647d590c",
        coffeTxt: "Want to make a donation and buy me a coffee? Thank you very much!"
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
        ethInitial: "Investimento inicial de Ethereum",
        ethInvest: "Investimento inicial de Ethereum",
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
        selectYourLanguage: "Selecione seu idioma",

        whenStart: "Quando minha mineração começará?",
        within15day: "Dentro de 15 dias após o final do período de contribuição. Previsto para 15 de setembro.",
        whyAreNoDay: "Por que não há tokens DIA em meu endereço ETH?",
        tokensNotBeen: "Os tokens ainda não foram distribuídos. Veja a resposta acima.",
        qualMyChronoPower: "Qual é o meu ChronoPower?",
        estimateLookingEtherScan: "Por favor, considere o etherscan. Todos os TimeMints serão alocados de acordo com a ordem ChronoLogic: https://etherscan.io/address/0xa723606e907bf84215d5785ea7f6cd93a0fbd121.",
        canIStillContrib: "Ainda posso contribuir?",
        noYourContribBeLost: "Não. Sua contribuição será perdida. Por favor, não contribua.",
        canITopUpNow: "Já fiz minha contribuição, posso contribuir mais?",
        noYourContribBeLostDoNotAttemp: "Não. Sua contribuição seria perdida. Não tente realizar outras contribuições.",
        beCareful: "Sobre o que devo ter cuidado?",
        beCarefulWhenClick: "Tenha cuidado ao clicar em links, abrir arquivos aleatórios no Slack ou, sempre que receber uma mensagem direta. Algumas pessoas já foram enganadas. Qualquer informação que a ChronoLogic precisar comunicar com você, estará no blog https://blog.chronologic.network.",
        discussSlack: "O que posso discutir em Slack?",
        shillingOwnProject: "Qualquer coisa que não seja sobre seus próprios projetos, por favor.",
        coffe: "Me compre um café",
        coffe_address: "0x1c58cacec962ad140d75ffe6daa97056647d590c",
        coffeTxt: "Quer fazer uma doação e comprar me um café? Muito obrigado!"
    }
};

var i18n = new VueI18n({
    locale: language(),
    messages: localeStrings,
});

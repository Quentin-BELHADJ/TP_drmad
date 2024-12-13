import LocalSource from "@/datasource/controller";

async function getAccountAmountFromLocalSource(number) {
    // récupération auprès de la source locale
    return LocalSource.getAccountAmount(number)
}

async function getAccountAmount(number) {
    let response = null;
    try {
        response = await getAccountAmountFromLocalSource(number)
    }
        // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le compte'}
    }
    return response
}

async function getAccountTransactionsFromLocalSource(number){
    return LocalSource.getAccountTransactions(number)
}

async function getAccountTransactions(number) {
    let response = null;
    try {
        response = await getAccountTransactionsFromLocalSource(number)
    }
        // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des transactions'}
    }
    return response
}



export default {
    getAccountAmount,
    getAccountTransactions,
}
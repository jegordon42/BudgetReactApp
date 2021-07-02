export const url = "http://localhost:8000/"; //"https://budgetflaskapp.azurewebsites.net/"

export const adjustTransDates = (trans) => {
    for(var i = 0; i < trans.length; i++){
        var date = new Date(trans[i]['Date']);
        date.setHours(0,0,0,0);
        trans[i]['Date'] = date.toLocaleDateString()
    }
    return trans
}
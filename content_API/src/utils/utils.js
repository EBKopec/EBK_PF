

module.exports = {
    monthId (month_id) {
        if (String(month_id).length === 5) {
            const monthId = String(month_id).slice(0, 4).concat('0', String(month_id).slice(4,))
            return monthId
        } else {
            return month_id
        }
    },

    formatToCurrency(amount){
        const value = parseFloat(amount).toFixed(3).replace(/\d(?=(\d{3})+\,)/g, '$&.');
        console.log(`Valores --->>>> ${amount} <<<<---`)
        return value
    }
}

// (month_id):
//     if len(str(month_id)) == 5:
//         monthId = str(month_id)[0:4] + '0' + str(month_id)[4:]
//         print(monthId)
//         return monthId
//     else:
//         print(month_id)
//         return month_id
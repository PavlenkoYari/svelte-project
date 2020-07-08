export function getCryptoValue (storeCountCrypto, currency, currCrypto, value, min, max) {
    if (!isNaN(+value) && +value >= min && +value <= max) {
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${currCrypto}`)
            .then(res => res.json())
            .then(result => {
                storeCountCrypto.update( () => +(result[currCrypto] * value).toFixed(8))
            })
    }
}

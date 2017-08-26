const request = require('request-promise');

const BASE_URL = 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD,EUR,BTC&ts=';

const mockBuyDate = 1503777592276;
const mockSellDate = 150377763344;

async function getETHPriceForUnixTimeStamp(timeStamp, currencyType) {
  try {
    const URL = `${BASE_URL}${timeStamp}`;
    const { ETH } = await request(URL, { json: true });
    return ETH[currencyType];
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

async function calculateReturnOnInvestment(buyDate, sellDate, volume, currencyType = 'USD') {
  const buyPrice = await getETHPriceForUnixTimeStamp(buyDate, currencyType);
  const sellPrice = await getETHPriceForUnixTimeStamp(sellDate, currencyType);

  const totalVolumeBuyPrice = buyPrice * volume;
  const totalVolumeSellPrice = sellPrice * volume;

  const returnOnInvestment = totalVolumeSellPrice - totalVolumeBuyPrice;

  return returnOnInvestment;
}

calculateReturnOnInvestment(mockBuyDate, mockSellDate, 300).then(res => console.log('res', res));

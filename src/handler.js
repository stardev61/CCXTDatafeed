import R from 'ramda';
import request from 'utils/request';
import dbClient from 'utils/db-client';
import husrt from 'utils/hurst'
import binddata from 'utils/binddata';
import lambdaInvoke from 'utils/lambda-invoke';
import { AttributeValue } from 'dynamodb-data-types'
const putItem = (tableName, param) => {
  const putparam = {
    TableName: tableName,
    Item: param
  };
  return dbClient('put', putparam);
};
async function getItemsFromDBWithPeriod(TableName, key, from, to) {
  var params = {
    TableName: TableName,
    KeyConditionExpression: 'symbol = :hkey and tstamp between :nfrom and :nto',
    ExpressionAttributeValues: {
      ':hkey': key,
      ':nfrom': from,
      ':nto': to
    }
  };
  return dbClient('query', params);
}
async function scrap(event, context, callback) {
  try {
    const signallen = process.env.SIGNALLEN || 50;
    const unixInterval = process.env.UNIXINTERVAL || 86400;
    const tblInterval = process.env.TBLINTERVAL || '1d';
    var dbRes = await getItemsFromDBWithPeriod(RtblName, querykey, from, to);
    var candleRes = dbRes.Items;
    candleRes.push(obj);
    await putItem(WtblName, result)
    callback(null, { message: `Successfully wrote to database` });
  } catch (e) {
    callback(e.toString());
  }
}

async function invoker(event, context, callback) {
  const STAGE = process.env.STAGE || 'dev';
  const LAMBDA_NAME = `binance-d-trigger-${STAGE}-scrap`;
  try {
    await lambdaInvoke(LAMBDA_NAME, event);
    callback(null, { message: 'Good!' });
  } catch (e) {
    callback(e.toString());
  }
}

export default {
  scrap, invoker
};

module.exports = {
  scrap, invoker
};

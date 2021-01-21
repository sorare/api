const web3Provider = new Web3.providers.WebsocketProvider(INFURA_ENDPOINT);
const web3 = new Web3(web3Provider);

const dealBlob = (deal: Deal): string => {
  return web3.eth.abi.encodeParameters(
    [
      'uint256',
      'address',
      'address',
      'uint256[]',
      'uint256[]',
      'uint256',
      'uint256',
      'address'
    ],
    [
      deal.dealId,
      deal.sender,
      deal.receiver || nullAddress,
      deal.receiveTokenIds || [],
      deal.sendTokenIds || [],
      deal.sendAmountInWei || 0,
      deal.minReceiveAmountInWei || 0,
      deal.bankAddress
    ]
  );
};

const settleMessage = (
  deal: Deal,
  action: SettleDealSignatureType,
  receiveAmountInWei?: string
) => {
  if (action === SettleDealSignatureType.ReceiveETH) {
    return web3.eth.abi.encodeParameters(
      ['uint8', 'uint256', 'bytes'],
      [action, receiveAmountInWei, dealBlob(deal)]
    );
  }

  return web3.eth.abi.encodeParameters(
    ['uint8', 'bytes'],
    [action, dealBlob(deal)]
  );
};

export const sendTransaction = (tx: TransactionConfig): Promise<string> => {
  return new Promise((resolve, reject) => {
    web3.eth.sendTransaction(tx, (error, hash) => {
      if (error) reject(error);
      resolve(hash);
    });
  });
};

class Wallet {
  private account: Account;

  public signSettleDeal(
    deal: Deal,
    action: SettleDealSignatureType,
    receiveAmountInWei?: string
  ) {
    return this.sign(settleMessage(deal, action, receiveAmountInWei));
  }

  private sign(message: string) {
    return this.account.sign(web3.utils.soliditySha3(message)!).signature;
  }
}
import { NFT_COLLECTION_ADDRESSES, BUBBLEGUM_PROGRAM_ID } from '../constants/solana';

function matchesProgram(tx) {
  return (
    tx.transaction?.message?.instructions?.some(
      ix => ix.programId === BUBBLEGUM_PROGRAM_ID
    ) ||
    tx.meta?.innerInstructions?.some(iix =>
      iix.instructions.some(ix => ix.programId === BUBBLEGUM_PROGRAM_ID)
    )
  );
}

function matchesCollection(tx) {
  return (
    tx.meta?.innerInstructions?.some(innerInstruction =>
      innerInstruction.instructions?.some(instruction =>
        NFT_COLLECTION_ADDRESSES.some(
          account =>
            instruction.accounts && instruction.accounts.includes(account)
        )
      )
    ) ||
    tx.transaction?.message?.accountKeys?.some(
      ({ pubkey }) => NFT_COLLECTION_ADDRESSES.includes(pubkey)
    )
  );
}

function formatTransaction(tx, stream) {
  const txData = {
    signature: tx.transaction.signatures[0],
    blockTime: stream.blockTime,
    blockHeight: stream.blockHeight,
    blockhash: stream.blockhash,
    isSuccessful: !tx.meta?.err,
    logs: [],
  };

  if (!txData.isSuccessful) {
    txData.logs = tx.meta.logMessages;
  }

  return txData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main(stream) {
  try {
    const transactions = [];

    for (let i = 0; i < stream.data.length; i += 1) {
      const block = stream.data[i];

      if (!block?.transactions) {
        return { error: 'Invalid or missing stream' };
      }

      const matchedTransactions = block.transactions
        .filter(tx => matchesProgram(tx) && matchesCollection(tx))
        .map(tx => formatTransaction(tx, block));

      transactions.push(...matchedTransactions);
    }

    if (transactions.length === 0) {
      return null;
    }

    return { metadata: stream.metadata, transactions };
  } catch (error) {
    console.error('Error in main function', error); // eslint-disable-line no-console

    return { error: error.message, stack: error.stack };
  }
}

module.exports = {
  main,
};

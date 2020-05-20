export const regexTest = (trollBoxMessage) => {
  let m;
  var positionSize;
  var entryPrice;

  const matchingPositionSize = /(?<=XBT[\da-zA-z]{3}:)[\s]*?[-\d]?[\d,.]+(?=[\s|Cont]*)/gm;
  const matchingEntry = /(?<=Cont[\s|@]{2})[\s\d][\d.,]+(?=[\s|```]*)/gm;

  while ((m = matchingPositionSize.exec(trollBoxMessage[0])) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === matchingPositionSize.lastIndex) {
      matchingPositionSize.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      positionSize = trim(match);
    });
  }

  while ((m = matchingEntry.exec(trollBoxMessage[0])) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === matchingEntry.lastIndex) {
      matchingEntry.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      entryPrice = trim(match);
    });
  }

  return [positionSize, entryPrice];
};

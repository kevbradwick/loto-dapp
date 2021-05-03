// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Loto {
  
  // an entry into a single loto competition draw
  struct Entry {
    uint8 num1;
    uint8 num2;
    uint8 num3;
    uint8 num4;
    uint8 num5;
    address player;
  }

  // a single loto competition
  struct Competition {
    uint256 drawDate;
    Entry[] entrants;
  }

  // the current competition in play
  Competition currentCompetition;

  /**
   * Enter the current competition. This requires payment in order enter
   */
  function enter(uint8[] memory numbers) public payable {
    // TODO: work out a better way to calculate payment
    require(msg.value == 1000, "insufficient payment");
    require(numbers.length == 5, "you must enter with 5 numbers");

    for (uint i = 0; i < 5; i++) {
      uint8 choice = numbers[i];
      if (choice < 1 || choice > 20) {
        revert("numbers must be between 1 and 20");
      }
      if (!_isUnique(numbers, choice)) {
        revert("number is not unique");
      }
    }
  }

  function _isUnique(uint8[] memory numbers, uint8 number) private pure returns(bool) {
    uint count = 0;
    for (uint i = 0; i < numbers.length; i++) {
      if (numbers[i] == number) {
        count++;
      }
    }
    return count == 1;
  }
}

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
  function enter(uint8 num1, uint8 num2, uint8 num3, uint8 num4, uint8 num5) public payable {
    // TODO: work out a better way to calculate payment
    require(msg.value > 1000, "insufficient payment");
    
    Entry memory entry = Entry(num1, num2, num3, num4, num5, msg.sender);
    currentCompetition.entrants.push(entry);
  }
}

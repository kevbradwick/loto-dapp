const { expect } = require("chai");

describe("Loto", () => {
  let token;
  let owner;
  let account1;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Loto");
    token = await Token.deploy();
    [owner, account1] = await ethers.getSigners();
  });

  describe("entry()", () => {
    it("reverts transactions with isufficient payment", async () => {
      await expect(token.enter(1, 2, 3, 4, 5)).to.be.revertedWith("insufficient payment");
    });
  });
});

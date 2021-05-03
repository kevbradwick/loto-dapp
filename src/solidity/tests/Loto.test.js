const { expect } = require("chai");

describe("Loto", () => {
  const FEE = 1000;

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
      const numbers = [1, 2, 3, 4, 5];
      await expect(token.enter(numbers)).to.be.revertedWith("insufficient payment");
    });

    it("reverts when you don't have the correct amount of numbers", async () => {
      const numbers = [1, 2];
      const options = {value: FEE};
      await expect(token.enter(numbers, options)).to.be.revertedWith("you must enter with 5 numbers");
    });

    it("reverts any number has been selected more than once", async () => {
      const numbers = [1, 1, 2, 3, 4];
      const options = {value: FEE};

      await expect(token.enter(numbers, options)).to.be.revertedWith("number is not unique");
    });

    it("reverts when numbers are out of range", async () => {
      const numbers = [30, 1, 2, 3, 4];
      const options = {value: FEE};

      await expect(token.enter(numbers, options)).to.be.revertedWith("numbers must be between 1 and 20");
    });

    it("enters the draw", async () => {
      const numbers = [1, 2, 3, 4, 5];
      const options = {value: FEE};

      await expect(token.enter(numbers, options)).not.to.be.reverted;
      expect(await token.inCurrentCompetition(owner.address)).to.be.true;
    });
  });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");

describe("MyContract", function () {
  let MyContract, myContract, owner, otherAccount;

  beforeEach(async function () {
    // Deploy the contract
    [owner, otherAccount] = await ethers.getSigners();
    MyContract = await ethers.getContractFactory("MyContract");
    myContract = await MyContract.deploy();
    await myContract.waitForDeployment() ;
  });

  it("should set the owner correctly during deployment", async function () {
    expect(await myContract.owner()).to.equal(owner.address);
  });

  it("should allow the owner to enter coordinates", async function () {
    await myContract.enterCoords(1, 2, 3);

    // Check if the arrays are updated correctly
    expect(await myContract.xarr(0)).to.equal(1);
    expect(await myContract.yarr(0)).to.equal(2);
    expect(await myContract.zarr(0)).to.equal(3);

    // Check if the sums are updated correctly
    const [xSum, ySum, zSum] = await myContract.getSums();
    expect(xSum).to.equal(1);
    expect(ySum).to.equal(2);
    expect(zSum).to.equal(3);
  });

  it("should update the sums correctly when multiple coordinates are entered", async function () {
    await myContract.enterCoords(1, 2, 3);
    await myContract.enterCoords(4, 5, 6);

    // Check sums
    const [xSum, ySum, zSum] = await myContract.getSums();
    expect(xSum).to.equal(5); // 1 + 4
    expect(ySum).to.equal(7); // 2 + 5
    expect(zSum).to.equal(9); // 3 + 6
  });

  it("should return the correct length of arrays", async function () {
    await myContract.enterCoords(1, 2, 3);
    await myContract.enterCoords(4, 5, 6);

    const length = await myContract.getArrLength();
    expect(length).to.equal(2);
  });

  it("should revert if a non-owner tries to enter coordinates", async function () {
    await expect(
        myContract.connect(otherAccount).enterCoords(1, 2, 3)
    ).to.be.revertedWith("Only the owner can enter coordinates");
  });

  it("should correctly handle empty state", async function () {
    const length = await myContract.getArrLength();
    expect(length).to.equal(0);

    const [xSum, ySum, zSum] = await myContract.getSums();
    expect(xSum).to.equal(0);
    expect(ySum).to.equal(0);
    expect(zSum).to.equal(0);
  });
});


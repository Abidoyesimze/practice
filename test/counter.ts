import {
  
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import hre, {ethers} from "hardhat";
 
describe("Counter", function(){
  let counter;

  async function deploycounter(){
    const [owner] = await hre.ethers.getSigners();
    const Counter = await hre.ethers.getContractFactory("Counter");
     counter = await Counter.deploy();
    return {counter, owner};
  }
  describe("get", function(){
    it(" should return the initial count", async function(){
    const {counter} = await loadFixture (deploycounter);
    const count = await counter.get();
    expect(count).to.equal(0);
    });
    
    it("should update increment", async function(){
      const {counter} = await loadFixture (deploycounter);
      await counter.inc();
      // await counter.dec();
      const count = await counter.get();
      expect(count).to.equal(1);
    });
    it("should revert on decrement below 0", async function () {
      const { counter } = await loadFixture(deploycounter);
      await expect(counter.dec()).to.be.revertedWith("Counter: count cannot go below zero");

    })
  })

})

    

   

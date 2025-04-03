pragma solidity ^0.8.27;

// SPDX-License-Identifier: UNLICENSED

contract MyContract {

    address public owner; 
    uint[] public xarr  ; 
    uint[] public yarr  ; 
    uint[] public zarr  ; 
    uint public xsum    ; 
    uint public ysum    ; 
    uint public zsum    ; 

    constructor() {
      owner = msg.sender ; 
      xsum = 0 ; 
      ysum = 0 ;
      zsum = 0 ; 
    }

    function enterCoords(uint _x,uint _y,uint _z) public {

      require(msg.sender == owner,"Only the owner can enter coordinates") ; 

      xarr.push(_x) ; 
      yarr.push(_y) ; 
      zarr.push(_z) ; 

      xsum += _x ; 
      ysum += _y ; 
      zsum += _z ; 

    }

    function getArrLength() public view returns(uint) {
      return(xarr.length) ; 
    }

    function getSums() public view returns(uint,uint,uint) {
      return(xsum,ysum,zsum) ; 
    }

}

pragma solidity ^0.4.8;

contract RevenueShareContract {
    uint amount;
    address vendor1;
    address vendor2;
    uint vendor1_percent;
    uint vendor2_percent;
  
    function splitRevenue(address _vendor1,address _vendor2,uint percent) payable {
        vendor1=_vendor1;
        vendor2=_vendor2;
        vendor1_percent=percent;
        vendor2_percent=100-percent;
        uint bal=this.balance;
        vendor1.transfer(vendor1_percent*bal/100); 
        vendor2.transfer(vendor2_percent*bal/100);  
    }
}
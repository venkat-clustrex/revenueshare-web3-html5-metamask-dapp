function vendor1ProfileOnChange(value) {
  document.getElementById("v2amount").value = 100 - value;
}
function getbalance1(value) {
  window.web3.eth.getBalance(value, (err, bal) => {
    document.getElementById("v1balance").value = window.web3.fromWei(bal, "ether") + " ETH";
  })
}
function getbalance2(value) {
  window.web3.eth.getBalance(value, (err, bal) => {
    document.getElementById("v2balance").value = window.web3.fromWei(bal, "ether") + " ETH";
  })
}
window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
    console.log("MetaMask Injected......!");
    window.web3.eth.getAccounts((err, accounts) => {
      document.getElementById("name").value = accounts[0];
      window.web3.eth.getBalance(accounts[0], (err, bal) => {
        document.getElementById("balance").value = window.web3.fromWei(bal, "ether") + " ETH";
      });
    });
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
})

function getTransactionReceipt(hash) {
  return new Promise(function (resolve, reject) {
    window.web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (!err)
        resolve(receipt)
      else
        reject(err);
    })
  })
}

$(document).ready(function () {
  const revenueAbi = [{ "constant": false, "inputs": [{ "name": "_vendor1", "type": "address" }, { "name": "_vendor2", "type": "address" }, { "name": "percent", "type": "uint256" }], "name": "splitRevenue", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "vendor1", "type": "address" }, { "indexed": false, "name": "vendor2", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transferred", "type": "event" }];
  const address = "0x1642cF220FE3e42B5ce70F5795d9fa1B78EB59d2";
  const etherscanBase = "https://rinkeby.etherscan.io/tx/";
  $("#event").hide();
  $("#DApp").show();
  $("#load").hide();
  window.web3 = new Web3(web3.currentProvider);
  const contractObj = window.web3.eth.contract(revenueAbi).at(address);

  // Commented the event listening code since it is not working currently
/*   contractObj.Transferred().watch(function (error, result) {
    console.log("Event Called")
    if (!error) {
      console.log(result);
      $("#event").show();
      $("#DApp").show();
      $("#load").hide();
    } else {
      console.log("Error! + ", error);
    }
  }); */

  $("#button").click(function () {
    $("#load").show();

    var _vendor1 = document.getElementById("vendor1").value;
    var _vendor2 = document.getElementById("vendor2").value;
    var _vendor1Amount = document.getElementById("v1amount").value;
    var _vendor2Amount = document.getElementById("v2amount").value;
    var _amount = document.getElementById("amount").value;

    contractObj.splitRevenue(_vendor1, _vendor2, _vendor1Amount, {
      value: window.web3.toWei(document.getElementById('amount').value, 'ether')
    }, function (err, hash) {
      if (!err) {
        document.getElementById("hash").innerHTML = hash;
        $("#hash").attr("href", etherscanBase + hash);
        $("#event").show();
        $("#DApp").show();
        $("#load").hide();
      } else {
        console.log("Error ", err);
        alert(err);
      }
    })
  })
});
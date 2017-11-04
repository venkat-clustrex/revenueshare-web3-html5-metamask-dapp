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
      console.log(window.web3.currentProvider);
      window.web3.eth.getAccounts((err, accounts) => {
        //console.log(accounts);
        document.getElementById("name").value = accounts[0];
        window.web3.eth.getBalance(accounts[0], (err, bal) => {
          document.getElementById("balance").value = window.web3.fromWei(bal, "ether") + " ETH";
        });
      });

    } else {
      console.log('No web3? You should consider trying MetaMask!')
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  })




  $(document).ready(function () {
    $("#event").hide();
    $("#DApp").show();
    $("#load").hide();
    $("#button").click(function () {
      $("#load").show();
      var _vendor1 = document.getElementById("vendor1").value;
      var _vendor2 = document.getElementById("vendor2").value;
      var _vendor1Amount = document.getElementById("v1amount").value;
      var _vendor2Amount = document.getElementById("v2amount").value;
      var _amount = document.getElementById("amount").value;


      var abi = [{ "constant": false, "inputs": [{ "name": "_vendor1", "type": "address" }, { "name": "_vendor2", "type": "address" }, { "name": "percent1", "type": "uint256" }], "name": "splitRevenue", "outputs": [], "payable": true, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "vendor1", "type": "address" }, { "indexed": false, "name": "amount1", "type": "uint256" }, { "indexed": false, "name": "vendor2", "type": "address" }, { "indexed": false, "name": "amount2", "type": "uint256" }], "name": "Transfered", "type": "event" }];

      window.web3 = new Web3(web3.currentProvider);
      var address = "0xee6a636bf08efc0b36306d16570e53e41e777ef4";
      var contractObj = window.web3.eth.contract(abi).at(address);

      contractObj.Transfered().watch(function (error, result) {
        if (!error) {
          console.log(result);
          $("#event").show();
          $("#DApp").show();
          $("#load").hide();
        } else {
          console.log("Error! + ", error);
        }
      });

      return new Promise((resolve, reject) => {
        contractObj.splitRevenue(_vendor1, _vendor2, _vendor1Amount, {
          value: window.web3.toWei(document.getElementById("amount").value, 'ether')

        }, function (err, res) {
          if (!err) {
            console.log("Transaction Hash ", res);
            document.getElementById("hash").innerHTML = res;
                $("#hash").attr("href", "https://rinkeby.etherscan.io/tx/"+res)
           
            resolve(res)
          } else {
            console.log("Error ", err);
          }

        })
      })


    })
  });
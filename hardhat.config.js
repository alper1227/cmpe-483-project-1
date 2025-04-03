require("dotenv").config(); // Çevresel değişkenleri yükler

module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat", // Varsayılan olarak hardhat ağı kullan
  networks: {
    hardhat: {}, // Hardhat test ağı
    localhost: { // Local ağ
      url: "http://127.0.0.1:8545"
    },
    goerli: { // Goerli ağı (şu an kullanılmıyor)
      url: process.env.ALCHEMY_API_KEY || "", 
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};

import axios from "axios";

class Services {
  static getReceipts = async () => {
    return await axios.get("http://localhost:3000/receipts");
  };

  static addReceipt = async (receipt) => {
    return await axios.post("http://localhost:3000/receipts", receipt);
  };
}

export default Services;

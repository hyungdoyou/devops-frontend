import { defineStore } from "pinia";
import axios from "axios";

const backend = 'http://43.201.66.101:8888/api';
// const backend = "http://43.201.66.101:8888/api";
const storedToken = sessionStorage.getItem("token");

export const useOrdersStore = defineStore("orders", {
  state: () => ({ ordersList: [], isOrderExist: true }),
  actions: {
    // 장바구니 목록 조회
    async getOrdersList(page, size) {
      let response = await axios.get(backend + `/orders/list/${page}/${size}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      this.ordersList = response.data.result;
      if (response.data.result.length !== 0) {
        this.isOrderExist = false;
      }
    },
  },
});

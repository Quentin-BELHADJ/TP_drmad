<template>
  <div>
    <h1>Login</h1>

    <div style="position: relative;">
      <span>Numéro de compte</span>
      <input  v-model="AccountNumber">
      <p>{{this.NumberRegex(AccountNumber)}}</p>
      <div v-if="accountNumberError === -1" class="error-bubble">
        Numéro de compte invalide
      </div>
    </div>
    <button @click="getAccountAmount(AccountNumber)" :disabled="disabled">voir montant du compte</button>
    <button  @click="getAccountTransactions(AccountNumber)" :disabled="disabled">voir transactions</button>
    <button @click="reset" :disabled="!AccountNumber">reset</button>

    <div v-if=" this.accountNumberError === 1">
      <p>{{ accountAmount }}$</p>


      <div v-if="accountTransactions">
        <ul v-for="transaction in accountTransactions" :key="transaction.id">
          <li>{{ transaction.amount }}, {{ dateFormat(transaction.date.$date) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    AccountNumber: '',
    disabled: false,
  }),
  computed: {
    ...mapState(['accountAmount']),
    ...mapState(['accountTransactions']),
    ...mapState(['accountNumberError']),

  },
  methods: {
    ...mapActions(['getAccountAmount']),
    ...mapActions(["getAccountTransactions"]),
    ...mapActions(["setAccountNumberError"]),
    dateFormat(date) {

      const d = new Date(date);

      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');

      return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
    },
    NumberRegex(AccountNumber) {
      const regex = /^[A-Za-z0-9]+-[0-9]+$/;
      if (AccountNumber === "") {
        this.disabled = true;
        return "";
    } else{
      if (!regex.test(AccountNumber)) {
        this.disabled = true;
        return "";
      } else {
        this.disabled = false;
        return "";
        }
      }
    },
    reset() {
      this.AccountNumber = '';
      this.disabled = true;
      this.setAccountNumberError(0);
    }
  }
}
</script>
<style scoped>
.error-bubble {
  position: absolute;
  bottom: -20px;
  left: 0;
  background-color: #f8d7da;
  color: #721c24;
  padding: 5px 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
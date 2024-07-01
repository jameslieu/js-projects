<template>
  <Header />
  <div class="container">
    <Balance :total="+total"/>
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted"/>
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue'
  import Balance from './components/Balance.vue'
  import IncomeExpenses from './components/IncomeExpenses.vue'
  import TransactionList from './components/TransactionList.vue'
  import AddTransaction from './components/AddTransaction.vue'
  
  import { useToast } from 'vue-toastification'

  import { ref, computed, onMounted } from 'vue';

  const toast = useToast();

  const transactions = ref([]);

  onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

    if (savedTransactions) {
      transactions.value = savedTransactions;
    }
  });

  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  });

  const income = computed(() => {
    return transactions.value
      .filter(x => x.amount > 0)
      .reduce((acc, transaction) => { return acc + transaction.amount; }, 0)
      .toFixed(2);
  });

  const expenses = computed(() => {
    return transactions.value
      .filter(x => x.amount < 0)
      .reduce((acc, transaction) => { return acc + transaction.amount; }, 0)
      .toFixed(2);
  });
    
  const handleTransactionSubmitted = (data) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: data.text,
      amount: data.amount 
    });

    saveTransactionsToLocalStorage();
    toast.success('Transaction added')
  }

  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(x => x.id != id)
    saveTransactionsToLocalStorage();
    toast.success('Transaction deleted')
  }

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
  }

  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }
</script>

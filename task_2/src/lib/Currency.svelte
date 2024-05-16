<script>
  import { onMount } from 'svelte';

  let rates = {};
  let amountFrom = 10;
  let amountTo;
  let currencyFrom = 'USD';
  let currencyTo = 'EUR';

  onMount(async () => {
    const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
    const data = await response.json();
    rates = data.rates;
    amountTo = ((amountFrom * rates[currencyTo]) / rates[currencyFrom]).toFixed(2);
  });
  
  function updateAmountFrom() {
    amountTo = ((amountFrom * rates[currencyTo]) / rates[currencyFrom]).toFixed(2);
  }

  function updateAmountTo() {
    amountFrom = ((amountTo * rates[currencyFrom]) / rates[currencyTo]).toFixed(2);
  }
</script>

<div style="margin-bottom: 5px;">
  <label>
    <span style="width: 50px;display: inline-block;">
      From:
    </span>
    <input type="number" bind:value={amountFrom} on:input={updateAmountFrom} />
    <select bind:value={currencyFrom} on:change={updateAmountFrom}>
      {#each Object.keys(rates) as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </label>
</div>

<div>
  <label>
    <span style="width: 50px;display: inline-block;">
      To:
    </span>
    <input type="number" bind:value={amountTo} on:input={updateAmountTo} />
    <select bind:value={currencyTo} on:change={updateAmountTo}>
      {#each Object.keys(rates) as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </label>
</div>

<template>
  <div id="app">
    <LineChart />
    <DataSendForm />
  </div>
</template>

<script>
import { dataLab } from "./utils/axios";
import { mapState, mapMutations } from "vuex";
import LineChart from "./components/LineChart";
import DataSendForm from "./components/DataSendForm.vue";
export default {
  components: { LineChart, DataSendForm },
  computed: {
    ...mapState(["chartData"]),
  },
  async created() {
    const response = await dataLab.get();
    const chartData = {
      labels: response.data[0].data.map((li) => li.period),
      datasets: response.data.reduce((acc, cur) => {
        const label = cur.title;
        const data = cur.data.map((li) => li.ratio);
        acc.push({
          label: label,
          data: data,
          borderColor: this.makeColor(),
          tension: 0.3,
        });
        return acc;
      }, []),
    };
    this.CHANGE_CHART_DATA(chartData);
    console.log(this.chartData.labels);
    console.log(this.chartData.datasets);
  },
  methods: {
    ...mapMutations(["CHANGE_CHART_DATA"]),
    makeColor() {
      return "#" + Math.round(Math.random() * 0xffffff).toString(16);
    },
  },
};
</script>

<style></style>
